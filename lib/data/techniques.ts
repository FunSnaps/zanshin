import type {
  Technique,
  BjjBelt,
  WrestlingLevel,
  JudoBelt,
  StrikingLevel,
} from '@/lib/types'

export const bjj: Record<BjjBelt, Technique[]> = {
  white: [
    {
      name: 'Rear naked choke',
      position: 'Back mount',
      steps: [
        { d: 'Secure the seatbelt — dominant arm over one shoulder, other arm under the opposite armpit', cue: 'Hands clasped at their chest. Keep your chest pressed against their back — no space.' },
        { d: 'Slide your top (choking) arm under their chin so your forearm sits across the throat', cue: 'Forearm on the throat, NOT the jaw. If it\'s on the jaw it\'s a pain technique, not a choke.' },
        { d: 'Your choking hand grabs the bicep of your non-choking arm', cue: 'Figure-4 grip. The non-choking hand then presses flat on the back of their skull.' },
        { d: 'Squeeze elbows toward each other and push your chest forward', cue: 'Don\'t pull their chin — extend your chest outward. Hooks stay in deep so they can\'t roll.' },
      ],
    },
    {
      name: 'Armbar from guard',
      position: 'Closed guard',
      steps: [
        { d: 'Break their posture — pull head down with both hands gripping collar and back of neck', cue: 'Their forehead near your chest. Remove all space between you.' },
        { d: 'Pivot your hips 90° — for a right-arm bar, swing your right leg up onto their back', cue: 'Hip rotation drives this, not just the leg. Left leg posts on their hip as anchor.' },
        { d: 'Drape your right leg over the back of their neck/head, clamping the arm', cue: 'Right leg across back of neck. Left foot presses their hip to prevent posture recovery.' },
        { d: 'Grip their wrist with both hands — thumbs pointing up, arm hugged to chest', cue: 'Their thumb faces the ceiling. No gaps between their arm and your chest.' },
        { d: 'Bridge hips upward with knees pinched together', cue: 'Power comes from hips rising, not pulling the arm back. Knees squeeze — this protects you if they stack.' },
      ],
    },
    {
      name: 'Triangle choke',
      position: 'Closed guard',
      steps: [
        { d: 'Break posture and shove one arm (their left) across your centerline with both hands', cue: 'Clearing the lane for your right leg to shoot over.' },
        { d: 'Shoot your right leg over their left shoulder', cue: 'Back of your right knee sits on the back of their left shoulder. Right foot in the air.' },
        { d: 'Lock figure-4 — right ankle hooks behind your left knee', cue: 'Right leg over shoulder, left leg bends to catch the right ankle. Lock it tight.' },
        { d: 'Pull their head down and shift your hips toward the trapped arm side', cue: 'Hands pull back of head. Hips angle left if trapping right arm. This cuts carotid.' },
        { d: 'Squeeze thighs together and extend hips upward', cue: 'Knees moving toward each other creates the choke. Keep the trapped arm across your centerline.' },
      ],
    },
    {
      name: 'Scissor sweep',
      position: 'Closed guard',
      steps: [
        { d: 'Open guard — post your left foot flat on their right hip bone', cue: 'Foot on the hip, not the thigh. This is your primary push lever.' },
        { d: 'Place your right shin horizontally across their belly/lower ribcage', cue: 'Right knee points left, right foot on their left side. You\'re creating scissors.' },
        { d: 'Right hand grips their left sleeve, left hand grips their collar', cue: 'Collar grip breaks posture and pulls them in. Sleeve grip prevents the arm post.' },
        { d: 'Simultaneously: push the hip, chop the bottom shin, pull the collar', cue: 'All three at once. Timing beats muscle here. They tip forward over the scissor.' },
      ],
    },
    {
      name: 'Shrimp escape',
      position: 'Under side control',
      steps: [
        { d: 'Frame: near forearm against their neck, far hand on their hip — elbows in', cue: 'Don\'t flatten. This frame creates space and prevents them driving their weight through.' },
        { d: 'Small bridge into them to momentarily shift their weight', cue: 'Just enough to unload pressure — not a full reversal attempt.' },
        { d: 'Shrimp hips explosively away, driving the hip on the mat outward', cue: 'Push off the floor with your far foot. Hips move AWAY from them, not up.' },
        { d: 'Shoot your knee into the space created and recover guard', cue: 'Knee goes inside to their hip. Half guard is fine as a stepping stone.' },
      ],
    },
  ],
  blue: [
    {
      name: 'De la Riva sweep',
      position: 'De la Riva guard',
      steps: [
        { d: 'Right leg DLR hook — outside-in around their right leg, foot behind their right knee', cue: 'Left foot posts on their left hip. DLR arm grips their ankle — don\'t lose this grip.' },
        { d: 'Left hand grips their right ankle; right hand grips their collar', cue: 'Ankle grip = base control. Collar grip = posture control. Both required.' },
        { d: 'Kick DLR hook upward while pulling ankle and pushing collar simultaneously', cue: 'Hook lifts their leg, collar pull disrupts upper body — they tip over the shoulder.' },
        { d: 'Follow the sweep and come up in single leg or knee slice', cue: 'Don\'t stay on your back. Immediately rise to top position.' },
      ],
    },
    {
      name: 'Kimura from side control',
      position: 'Side control (top)',
      steps: [
        { d: 'Chest to chest, hips low, head on far side — secure solid side control first', cue: 'Near arm under neck, far arm under far armpit. Hips low to prevent bridging.' },
        { d: 'Scoop far arm up — right hand grabs their right wrist', cue: 'Wrist grip first. Don\'t reach for the elbow first — isolate at the wrist.' },
        { d: 'Left arm threads under their elbow, left hand grabs your own right wrist — figure-4', cue: 'Your arms form a triangle around their elbow. This is the Kimura grip.' },
        { d: 'Walk your hips toward their head to elevate the elbow', cue: 'Hip movement creates the angle. As you move north, their elbow lifts off the mat.' },
        { d: 'Rotate their arm: forearm up → across their back → toward their hip', cue: 'Small circles, steady pressure. Stop at the tap. No sudden yanks.' },
      ],
    },
    {
      name: 'Omoplata',
      position: 'Closed / spider guard',
      steps: [
        { d: 'Control their sleeve and swing your right leg over their left shoulder', cue: 'Right knee lands behind their left shoulder blade. This is your lever.' },
        { d: 'Sit up and scoot your hips away from their body', cue: 'The further your hips, the more shoulder torque. Use elbow to push up to seated.' },
        { d: 'Block the forward roll — left hand presses on their far hip', cue: 'Hip block stops the roll escape. Head up, don\'t hunch.' },
        { d: 'Lean forward — your hips press down onto their shoulder joint', cue: 'You\'re loading upward on their elbow. Small adjustments here make big difference.' },
      ],
    },
  ],
  purple: [
    {
      name: 'Berimbolo',
      position: 'De la Riva guard',
      steps: [
        { d: 'Deep DLR hook with strong ankle control — both hands on the ankle', cue: 'Don\'t lose ankle grip when inverting. This is the most common mistake.' },
        { d: 'Pull ankle across your body and roll backward, tucking chin', cue: 'Commit fully to the inversion. Half-committing gets you stuck upside down.' },
        { d: 'While inverted, find the back of their thigh with your legs and drive hips up', cue: 'Your legs hook their far thigh as you spin. Hips drive the rotation, not just arms.' },
        { d: 'Emerge behind them — secure seatbelt grip immediately', cue: 'Don\'t celebrate the inversion. Claim the back before they adjust.' },
      ],
    },
    {
      name: 'Buggy choke',
      position: 'Bottom mount',
      steps: [
        { d: 'When they post their hand near your shoulder, pin their wrist to your chest with your near arm', cue: 'Their left arm posting = trap with your left arm. Wrist held tight against your chest.' },
        { d: 'Thread your same arm (left) under your own left leg — arm through leg creating a loop', cue: 'Your left arm now controls both their wrist AND hooks under your own knee. One arm, two jobs.' },
        { d: 'Their arm is trapped inside the loop between your arm and your leg', cue: 'If the loop is loose the choke won\'t work. Tighten by pulling your knee toward your chest.' },
        { d: 'Squeeze knee to chest and compress — this cuts the carotid', cue: 'Subtle squeeze, big effect. No muscling. The geometry does the work.' },
      ],
    },
  ],
  brown: [
    {
      name: 'Calf slicer',
      position: 'Top turtle / 50-50',
      steps: [
        { d: 'Wedge your shin into the back of their knee joint', cue: 'Shin bone sits in the crook of the knee. Your foot hooks over their shin from the outside.' },
        { d: 'Thread your arms — one over, one under their leg — and Gable grip (palms facing each other, no thumbs)', cue: 'Tight clasp. No thumbs in Gable grip — reduces injury risk and strengthens the lock.' },
        { d: 'Pull up on the ankle and drive your shin down into the back of the knee', cue: 'The shearing force between shin and calf on the knee joint is the submission.' },
      ],
    },
  ],
  black: [
    {
      name: 'Inside heel hook',
      position: 'Ashi garami (inside)',
      steps: [
        { d: 'Inside ashi: inside leg posts on their hip, outside leg threads behind their knee', cue: 'Your legs form a triangle around their leg. Inside knee pointed at their hip. Hips off mat.' },
        { d: 'Cup their heel deep in your armpit on the same side as your outside leg', cue: 'Heel sits in the armpit — not on the forearm. No daylight between arm and heel.' },
        { d: 'Rotate your chest AWAY from them — internal rotation of their knee', cue: 'Chest turns away. This is counterintuitive — away, not toward. Knee internally rotates.' },
        { d: 'Power comes from body rotation — hips, chest, shoulders all turn together', cue: 'Arms alone won\'t finish cleanly. Full body rotation. This is a dangerous submission — drill responsibly.' },
      ],
    },
  ],
}

export const wrestling: Record<WrestlingLevel, Technique[]> = {
  beginner: [
    {
      name: 'Double leg takedown',
      position: 'Open stance',
      steps: [
        { d: 'Level change — drop your hips, lead knee drives toward just inside their lead foot', cue: 'Back stays straight. Don\'t hunch your back — that kills your drive power.' },
        { d: 'Drive forward, head to the outside of their hip (not into the belly)', cue: 'Head outside = no guillotine. Ear pressed against their hip bone.' },
        { d: 'Arms scoop both legs — hands lock behind their knees in a Gable grip', cue: 'Behind the knees, not the ankles. Ankle grip loses the drive angle.' },
        { d: 'Stand up and drive through them — hips rising, head up', cue: 'Takedown comes from leg drive — you\'re standing up as you push. Don\'t lean.' },
        { d: 'Cut the corner — step to the side as they fall, land in side control', cue: 'Don\'t fall straight on top. Step to angle 45° and guide them down.' },
      ],
    },
    {
      name: 'Single leg (high crotch)',
      position: 'Open stance',
      steps: [
        { d: 'Shoot on lead leg — head inside their hip, shoulder drives into their thigh', cue: 'Head inside (between legs) — opposite of the double leg. Shoulder to inner thigh.' },
        { d: 'Lock hands behind their thigh in a Gable grip', cue: 'Clasped behind the thigh, not the knee. Palms facing each other, no thumbs.' },
        { d: 'Stand up and lift — drive their hips above head level', cue: 'Straighten your legs fully. When their base disappears they\'ll tip.' },
        { d: 'Circle away from their free leg and run the pipe or trip to finish', cue: 'Running the pipe: drive their captured knee forward. Their base collapses.' },
      ],
    },
  ],
  intermediate: [
    {
      name: 'Arm drag to back',
      position: 'Pummeling / tie-up',
      steps: [
        { d: 'Same-side hand grips their wrist — light, redirecting grip', cue: 'Right hand grabs their right wrist. Don\'t muscle — you\'re redirecting momentum.' },
        { d: 'Other hand grips their upper arm / tricep', cue: 'Left hand grabs their right tricep. Two-point control of the arm.' },
        { d: 'Pull their arm across your body as your lead foot steps behind them', cue: 'Their arm goes left as your left foot steps behind their right foot. Simultaneous.' },
        { d: 'Establish the back — near hook in, seatbelt grip (top arm over shoulder, bottom under armpit)', cue: 'Inside hook first. Seatbelt clasped at their chest. Chest to their back, no space.' },
      ],
    },
    {
      name: 'Snap-down to front headlock',
      position: 'Head tie / collar tie',
      steps: [
        { d: 'Establish collar tie — hand on back of their neck, elbow framing down', cue: 'Fingers on back of neck, palm controlling. Don\'t grab hair. Elbow down to frame.' },
        { d: 'When they push into you, use their forward energy — snap the head sharply downward', cue: 'Pull with the collar tie hand AND push their same-side shoulder with your other hand. Simultaneous snap.' },
        { d: 'Circle around as they stagger forward, take the front headlock', cue: 'One arm under chin (or around neck), other arm over their back. Head trapped under your armpit.' },
        { d: 'From front headlock: drive them down, take the back, or shoot a Peterson roll', cue: 'Don\'t just hold — be aggressive. They\'ll stand back up if you stall.' },
      ],
    },
  ],
  advanced: [
    {
      name: 'Peterson roll',
      position: 'Front headlock',
      steps: [
        { d: 'From front headlock — near arm overhooks their near arm tightly', cue: 'Your right arm traps their right arm. Elbow up, arm tight against your ribs.' },
        { d: 'Drop to the inside knee and drive your shoulder into them', cue: 'Inside knee hits mat, your shoulder drives into their ribs / hip area.' },
        { d: 'Roll them over your body by driving through and turning into them', cue: 'Your trapped-arm pressure and shoulder drive roll them across you onto their back.' },
        { d: 'Come up on top in a tight mat position or transition to half guard', cue: 'Stay tight through the roll. Loose Peterson = they escape the roll or reverse.' },
      ],
    },
  ],
}

export const judo: Record<JudoBelt, Technique[]> = {
  white: [
    {
      name: 'O-soto-gari (major outer reap)',
      position: 'Tachi-waza (standing)',
      steps: [
        { d: 'Establish right-hand grip on their left collar lapel (near the shoulder); left hand grips their right sleeve at the elbow', cue: 'Sleeve grip elbow controls their arm — grip at the elbow bend, not the wrist.' },
        { d: 'Break their balance backward and to their right rear corner (kuzushi)', cue: 'Push collar hand forward-right, pull sleeve hand back-left. Their weight shifts onto their right heel.' },
        { d: 'Step your right foot past their right foot, placing it just outside and slightly behind theirs', cue: 'Your right foot lands parallel to and just outside theirs. This is the entry.' },
        { d: 'Swing your right leg back in a wide reaping arc against their right leg', cue: 'The reap contacts their right calf/leg from behind. Hip drives forward as leg sweeps back.' },
        { d: 'Simultaneously drive collar hand forward and down to complete the throw', cue: 'Kuzushi + entry + reap + drive must coordinate. The throw is in the balance break, not the leg.' },
      ],
    },
    {
      name: 'O-goshi (major hip throw)',
      position: 'Tachi-waza (standing)',
      steps: [
        { d: 'Right-hand grip slides from collar to wrap around their waist/belt — deep underhook', cue: 'Right arm fully around their waist, hand on the small of their back. Pull them onto your hip.' },
        { d: 'Left hand grips their right sleeve at the elbow', cue: 'Sleeve grip keeps their arm controlled and helps the rotation.' },
        { d: 'Step in with your right foot between their feet, then left foot joins — turn so your back faces them', cue: 'Both feet now between theirs. Your hips are in front of their hips. Back to their chest.' },
        { d: 'Load them onto your hip — pull their hip onto yours by straightening your legs', cue: 'Legs were bent on entry — now straighten and lift. Their feet should leave the ground.' },
        { d: 'Bend forward and rotate — their body rolls over your hip and lands on their back', cue: 'Pull sleeve elbow across, hip drives the rotation. Don\'t just lean — rotate fully.' },
      ],
    },
  ],
  yellow: [
    {
      name: 'Seoi-nage (shoulder throw)',
      position: 'Tachi-waza (standing)',
      steps: [
        { d: 'Right hand grips collar, left hand grips their right sleeve at the elbow', cue: 'Standard sleeve-lapel grip. Sleeve at elbow — not wrist.' },
        { d: 'Step your right foot in deep — between their feet or just inside their right foot', cue: 'Toes pointing the same direction as them after the turn. Deep entry is everything.' },
        { d: 'Turn fully — left foot pivots so your back faces their chest, knees bent', cue: '180° rotation. Your back is fully to their chest. Both knees bent — lower than them.' },
        { d: 'Drive your right elbow under their right armpit and pull them onto your back', cue: 'Right arm shoots through under their armpit. Their arm sits on your shoulder. Pull with both arms.' },
        { d: 'Straighten legs and bend forward — they rotate over your shoulder', cue: 'Legs drive up, upper body bends forward. Their momentum carries them over and down.' },
      ],
    },
    {
      name: 'De-ashi-harai (forward foot sweep)',
      position: 'Tachi-waza (standing)',
      steps: [
        { d: 'Move together with your partner — create a walking rhythm', cue: 'Timing is everything. The sweep happens AS their foot hits the floor, not before or after.' },
        { d: 'As their right foot steps forward and makes contact with the mat, sweep the sole', cue: 'Your left foot sweeps their right foot at the exact moment of contact — when weight begins to transfer.' },
        { d: 'Sweep foot to foot — your sole slides across the mat, meeting their foot', cue: 'Contact with the sole of your foot to the sole of theirs. Not a kick — a slide-sweep.' },
        { d: 'Pull sleeve hand and push collar hand in the direction of their movement to complete', cue: 'Kuzushi direction matches foot direction. If sweeping right foot, direct them to their right front corner.' },
      ],
    },
  ],
  orange: [
    {
      name: 'Uchi-mata (inner thigh throw)',
      position: 'Tachi-waza (standing)',
      steps: [
        { d: 'Standard grip, break balance forward to their right front corner', cue: 'Kuzushi first — no balance break, no throw. Pull them onto the balls of their feet.' },
        { d: 'Step in with your right foot between their legs, pivot on it so back faces them', cue: 'Foot lands between their feet. Full pivot — your back to their chest, knees bent.' },
        { d: 'Drive your right leg up between their thighs, reaping their inner thigh upward', cue: 'Leg swings up the inside — this is the inner thigh reap. Hip rotation drives it.' },
        { d: 'Bend forward and pull both grips to complete the throw', cue: 'Collar hand pulls forward-down, sleeve hand pulls across. Hip and leg do the work.' },
      ],
    },
    {
      name: 'Osoto-otoshi (major outer drop)',
      position: 'Tachi-waza (standing)',
      steps: [
        { d: 'Break balance backward to their right rear corner — collar hand drives, sleeve hand pulls', cue: 'Their weight shifts onto their right heel. More aggressive kuzushi than o-soto-gari.' },
        { d: 'Step deep with right foot just outside their right foot', cue: 'Entry is the same as o-soto-gari but the reap action differs.' },
        { d: 'Instead of a full reap, drop your weight straight down — no leg swing', cue: 'You\'re collapsing THROUGH them, not sweeping. Your bodyweight drops onto their off-balance leg.' },
        { d: 'Drive collar hand straight down as you drop', cue: 'The combination of balance break + bodyweight drop takes them to the mat without a big sweep.' },
      ],
    },
  ],
  green: [
    {
      name: 'Harai-goshi (sweeping hip throw)',
      position: 'Tachi-waza (standing)',
      steps: [
        { d: 'Right arm wraps around waist (like o-goshi), left grips right sleeve at elbow', cue: 'Hip wrap goes around the waist or belt. Pull them tight against your body — no space.' },
        { d: 'Step in and pivot — back to their chest, right foot between their feet', cue: 'Entry mirrors o-goshi. Knees bent, hips lower than theirs.' },
        { d: 'Sweep your right leg outward and across both of their legs from front to outside', cue: 'Right leg sweeps across and outside their right leg in a wide arc — not up, but around.' },
        { d: 'Drive forward and rotate — hip combined with the sweeping leg takes both their legs', cue: 'O-goshi throws one hip; Harai-goshi sweeps both legs. Don\'t confuse them.' },
      ],
    },
  ],
  black: [
    {
      name: 'Tomoe-nage (circle throw / sacrifice)',
      position: 'Tachi-waza → sacrifice',
      steps: [
        { d: 'Break balance forward — pull them strongly toward you', cue: 'They must be leaning forward into you. If they\'re upright or pulling back this won\'t work.' },
        { d: 'As they step into you, drop straight down onto your back', cue: 'Fall to your back between their feet. Fast and committed — hesitation = failed throw.' },
        { d: 'Place your right foot on their left hip (or lower belly) as you fall', cue: 'Foot placement must be on the hip bone, not the stomach — gives the lever point for the circle.' },
        { d: 'Extend your leg and pull their arms simultaneously — they circle over you', cue: 'Leg pushes up as arms pull down. They rotate in a circle over your head and land behind you.' },
      ],
    },
  ],
}

export const mt: Record<StrikingLevel, Technique[]> = {
  beginner: [
    {
      name: 'Teep (push kick)',
      position: 'Long range',
      steps: [
        { d: 'Chamber the lead knee straight up toward your chest', cue: 'Knee at target height. Heel drawn up. Don\'t swing — chamber first.' },
        { d: 'Thrust the foot forward — heel leads, ball of foot makes contact', cue: 'Push, not a swing. Drive through the target with the ball of the foot.' },
        { d: 'Snap it back immediately — don\'t leave leg extended', cue: 'Retract to chamber then return to stance. Slow return gets grabbed.' },
      ],
    },
    {
      name: 'Muay Thai roundhouse',
      position: 'Medium-long range',
      steps: [
        { d: 'Step lead foot 45° outward to create hip clearance', cue: 'Small pivot of lead foot opens your hip for full rotation.' },
        { d: 'Drive the rear hip forward and swing rear leg in a wide arc', cue: 'Kick starts from the hip. Your whole rear side rotates.' },
        { d: 'Turn over the kick — kicking-side hip faces the target at impact', cue: 'At full rotation your hip is square to target. Rear shoulder swings forward.' },
        { d: 'Strike with the lower third of the shin — NOT the foot', cue: 'Point toes to lock the ankle. A floppy ankle breaks on contact.' },
      ],
    },
  ],
  intermediate: [
    {
      name: 'Clinch knee',
      position: 'Clinch',
      steps: [
        { d: 'Establish double collar tie — both hands interlocked on back of neck, palms flat', cue: 'Pull DOWN, not backward. Elbows come together as you pull.' },
        { d: 'Break their posture — pull head down toward your hips', cue: 'Their chin tucks toward their chest. No space between you.' },
        { d: 'Chamber the rear knee straight up — toes pointed down', cue: 'Drive upward through their midsection. Not at an angle — straight up.' },
        { d: 'Pull head into the knee simultaneously at impact', cue: 'Head pull and knee drive happen at the same moment. Doubles effective impact.' },
      ],
    },
    {
      name: 'Horizontal elbow',
      position: 'Close range',
      steps: [
        { d: 'Close distance — elbow range is shorter than punch range', cue: 'Step into them. At arm\'s length it won\'t land clean.' },
        { d: 'Arm bends to 90°, drive elbow tip horizontally across the face', cue: 'Elbow stays at shoulder height — level shot. Shoulder rotates, hip drives.' },
        { d: 'Make contact with the tip of the elbow bone — not the forearm', cue: 'The tip is the cutting tool. Forearm contact is a smash, not an elbow.' },
      ],
    },
  ],
  advanced: [
    {
      name: 'Switch kick',
      position: 'Long range',
      steps: [
        { d: 'Set up — switch should not come cold', cue: 'Jab-cross then switch, or fake teep then switch. Never cold.' },
        { d: 'Switch feet — small hop, previously-rear foot lands forward', cue: 'Feet land almost simultaneously. Stay light.' },
        { d: 'Original lead leg is now rear — fire as full roundhouse', cue: 'Full hip rotation. Maximum power. The switch is what creates it.' },
      ],
    },
  ],
  elite: [],
}

export const boxing: Record<StrikingLevel, Technique[]> = {
  beginner: [
    {
      name: 'Jab',
      position: 'Long range',
      steps: [
        { d: 'Extend lead hand straight — shoulder rotates forward, rear hand stays at chin', cue: 'First two knuckles lead. Arm fully extends. Return along the same path.' },
        { d: 'Fist rotates — knuckles slightly inward at full extension', cue: 'Palm down on the way out and back. Snap creates the speed.' },
      ],
    },
    {
      name: 'Cross',
      position: 'Long range',
      steps: [
        { d: 'Drive off ball of rear foot — rear heel rises as hip rotates forward', cue: 'Power starts from the floor. No windup — load is your natural stance.' },
        { d: 'Rear hand extends straight — shoulder drives forward, chin tucks behind it', cue: 'Rear shoulder comes forward and slightly up, shielding chin on same side.' },
        { d: 'Fist turns over — first two knuckles connect, wrist straight and locked', cue: 'Return to guard immediately. Slip or move right after.' },
      ],
    },
    {
      name: 'Lead hook',
      position: 'Medium range',
      steps: [
        { d: 'Pivot sharply on lead foot — toes turn outward', cue: 'Foot pivot generates rotation. Without it the hook is arm-only.' },
        { d: 'Lead arm at 90°, swings parallel to the floor, elbow at shoulder height', cue: 'Elbow level = harder to see. Elbow low = weaker power.' },
        { d: 'Hip and arm rotate together — hip drives shoulder, shoulder drives arm', cue: 'Return elbow up. Rear hand never leaves the chin.' },
      ],
    },
  ],
  intermediate: [
    {
      name: 'Slip + counter cross',
      position: 'Counter',
      steps: [
        { d: 'React to their shoulder rotation — not the fist', cue: 'If you wait for the fist it\'s too late. Read the shoulder.' },
        { d: 'Slip outside their jab — head moves to your right, slightly forward', cue: 'Your chin is behind their arm — protected. Head right and forward.' },
        { d: 'As head slips, rear hand already loading from hip rotation', cue: 'Slip and load are simultaneous. You\'re halfway through the cross already.' },
        { d: 'Fire the cross inside lane as you come back up', cue: 'Your cross travels to their face while still low. Move off after.' },
      ],
    },
  ],
  advanced: [
    {
      name: 'Check hook (pivot counter)',
      position: 'Counter',
      steps: [
        { d: 'Read their rush — time it, don\'t guess', cue: 'Works on aggressive opponents who chase. Wait for the rush.' },
        { d: 'Pivot sharply on lead foot — 90° outward, weight transfers', cue: 'Big pivot. You\'re stepping completely off the line.' },
        { d: 'Lead hook thrown AS you pivot — arm and foot move simultaneously', cue: 'They run into your punch. The pivot creates the power and angle.' },
        { d: 'End up 90° from their direction — reset guard immediately', cue: 'Hold position. Don\'t follow them in.' },
      ],
    },
  ],
  elite: [],
}

export const kb: Record<StrikingLevel, Technique[]> = {
  beginner: [
    {
      name: 'Jab-cross-low kick',
      position: 'Combination',
      steps: [
        { d: 'Jab to measure distance and occupy their vision', cue: 'Setup punch. Don\'t commit — their attention needs to go up.' },
        { d: 'Cross — full hip rotation, their attention is on their head', cue: 'Power shot. This is where the combo\'s damage lives.' },
        { d: 'Step lead foot outward to create angle for the kick', cue: 'Small step off-centerline. Moves you off their counter.' },
        { d: 'Rear-leg low kick to outer thigh with the shin, just above the knee', cue: 'Hip rotates through. Their attention was up — leg unguarded.' },
      ],
    },
  ],
  intermediate: [
    {
      name: 'Spinning back kick',
      position: 'Long range / counter',
      steps: [
        { d: 'Set up with a jab — orient them directly in front', cue: 'They must be straight ahead. Off-angle = miss.' },
        { d: 'Spin toward your rear side — pivot on lead foot, find them over your rear shoulder FIRST', cue: 'Eyes find target before the kick launches. Never spin blind.' },
        { d: 'Chamber rear leg and thrust the heel straight backward', cue: 'Heel drives back in a straight line. Hip extension and glutes, not a swing.' },
        { d: 'Return to stance facing them — guard up immediately', cue: 'Spin all the way through. Don\'t leave your back exposed.' },
      ],
    },
  ],
  advanced: [],
  elite: [],
}

export function getTechniques(
  disc: 'grappling' | 'striking',
  sub: string,
  tier: string,
): Technique[] {
  if (disc === 'grappling') {
    if (sub === 'bjj')       return bjj[tier as BjjBelt]       ?? []
    if (sub === 'wrestling') return wrestling[tier as WrestlingLevel] ?? []
    if (sub === 'judo')      return judo[tier as JudoBelt]     ?? []
  } else {
    if (sub === 'mt')        return mt[tier as StrikingLevel]  ?? []
    if (sub === 'boxing')    return boxing[tier as StrikingLevel] ?? []
    if (sub === 'kb')        return kb[tier as StrikingLevel]  ?? []
  }
  return []
}

export function makeKey(disc: string, sub: string, tier: string, idx: number): string {
  return `${disc}|${sub}|${tier}|${idx}`
}

export function parseKey(key: string): { disc: string; sub: string; tier: string; idx: number } | null {
  const parts = key.split('|')
  if (parts.length !== 4) return null
  const [disc, sub, tier, idxStr] = parts
  const idx = parseInt(idxStr, 10)
  if (isNaN(idx)) return null
  return { disc, sub, tier, idx }
}
