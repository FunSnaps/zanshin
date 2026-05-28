import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'
import type { RecipeDetail, RecipeIngredient } from '@/lib/types'

interface SpoonacularIngredient {
  name: string
  amount: number
  unit: string
  original: string
  aisle: string
}

interface SpoonacularStep {
  number: number
  step: string
}

interface SpoonacularInstruction {
  steps: SpoonacularStep[]
}

interface SpoonacularRecipe {
  id: number
  title: string
  image: string
  servings: number
  extendedIngredients: SpoonacularIngredient[]
  analyzedInstructions: SpoonacularInstruction[]
  sourceUrl: string
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return NextResponse.json({ error: 'Unauthenticated' }, { status: 401 })
  }

  const apiKey = process.env.SPOONACULAR_API_KEY
  if (!apiKey) {
    return NextResponse.json({ error: 'Recipe API not configured' }, { status: 500 })
  }

  const { id } = await params
  const recipeId = parseInt(id, 10)
  if (isNaN(recipeId)) {
    return NextResponse.json({ error: 'Invalid recipe id' }, { status: 400 })
  }

  const url = new URL(`https://api.spoonacular.com/recipes/${recipeId}/information`)
  url.searchParams.set('apiKey', apiKey)
  url.searchParams.set('includeNutrition', 'false')

  const res = await fetch(url.toString(), { next: { revalidate: 3600 } })
  if (!res.ok) {
    return NextResponse.json({ error: 'Recipe fetch failed' }, { status: res.status })
  }

  const raw: SpoonacularRecipe = await res.json()

  const ingredients: RecipeIngredient[] = (raw.extendedIngredients ?? []).map(i => ({
    name:     i.name,
    amount:   i.amount,
    unit:     i.unit,
    original: i.original,
    aisle:    i.aisle ?? 'Other',
  }))

  const steps: string[] = (raw.analyzedInstructions ?? [])
    .flatMap((ins: SpoonacularInstruction) => ins.steps ?? [])
    .sort((a: SpoonacularStep, b: SpoonacularStep) => a.number - b.number)
    .map((s: SpoonacularStep) => s.step)

  const detail: RecipeDetail = {
    id:          raw.id,
    title:       raw.title,
    image:       raw.image,
    servings:    raw.servings ?? 1,
    ingredients,
    steps,
    sourceUrl:   raw.sourceUrl ?? '',
  }

  return NextResponse.json(detail, {
    headers: { 'Cache-Control': 'private, max-age=300, stale-while-revalidate=3600' },
  })
}
