import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  // Auth guard — only authenticated users can search recipes
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return NextResponse.json({ error: 'Unauthenticated' }, { status: 401 })
  }

  const apiKey = process.env.SPOONACULAR_API_KEY
  if (!apiKey) {
    return NextResponse.json({ error: 'Recipe API not configured' }, { status: 500 })
  }

  const { searchParams } = new URL(request.url)
  const q           = searchParams.get('q') ?? ''
  const minProtein  = searchParams.get('minProtein')  ?? ''
  const maxCalories = searchParams.get('maxCalories') ?? ''
  const type        = searchParams.get('type')        ?? ''

  const url = new URL('https://api.spoonacular.com/recipes/complexSearch')
  url.searchParams.set('apiKey', apiKey)
  url.searchParams.set('query', q)
  url.searchParams.set('number', '8')
  url.searchParams.set('addRecipeNutrition', 'true')
  if (minProtein)  url.searchParams.set('minProtein', minProtein)
  if (maxCalories) url.searchParams.set('maxCalories', maxCalories)
  if (type)        url.searchParams.set('type', type)

  const res = await fetch(url.toString(), { next: { revalidate: 3600 } })
  if (!res.ok) {
    return NextResponse.json({ error: 'Recipe search failed' }, { status: res.status })
  }

  interface SpoonacularNutrient { name: string; amount: number }
  interface SpoonacularResult {
    id: number
    title: string
    image: string
    nutrition?: { nutrients?: SpoonacularNutrient[] }
  }
  const raw: { results?: SpoonacularResult[] } = await res.json()

  const results = (raw.results ?? []).map((r: SpoonacularResult) => {
    const nutrients = r.nutrition?.nutrients ?? []
    const get = (name: string) =>
      Math.round(nutrients.find((n: SpoonacularNutrient) => n.name === name)?.amount ?? 0)
    return {
      id:       r.id,
      title:    r.title,
      image:    r.image,
      calories: get('Calories'),
      protein:  get('Protein'),
    }
  })

  return NextResponse.json({ results })
}
