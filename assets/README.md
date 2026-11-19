# Ninja artwork

## Mount Fuji quiz-page background — 2026-11-19

`assets/fuji-maple.webp` is an original Mount Fuji, lake and red maple illustration
generated with the built-in `image_gen` tool from the owner's scenic reference.
Exported with Sharp to 1672×941 WebP (quality 88, 293,012 bytes). The reference
photograph and its lettering are not bundled. CSS displays this decorative local
asset only behind the quiz incident screen, with a dark contrast overlay; the
homepage keeps its existing background. It requires no runtime AI or external service.

### Final Fuji prompt

Use case: stylized-concept. Asset type: full-page background for the NOC Ninja quiz, behind opaque dark UI panels. Create an original wide 16:9 landscape of Mount Fuji framed by red Japanese maple branches and leaves, inspired by the user's attached reference composition. Snow-capped Fuji rises beyond a calm lake and distant autumn shoreline. Scarlet and deep crimson maple leaves on graceful dark branches frame the upper corners, top edge and side edges, with an open view toward the iconic mountain. Place the summit in the upper-middle portion so it can be glimpsed above panels, and keep rich autumn foliage visible around the edges. Style: polished hand-painted 2D game environment, restrained cel shading and natural architectural-free scenery, compatible with our blue-hour illustrated Himeji Castle arena and chibi ninja. Cool blue sky and lake, indigo mountain shadows, warm vivid red maple leaves. Early twilight, enough light to recognize mountain and foliage, quiet mood. Full bleed background illustration only. No UI, panels, people, ninja, buildings in foreground, text, signature, logos, flags or watermark. Do not copy the reference photograph's lettering.

## Himeji Castle arena background — 2026-11-19

`assets/himeji-castle.webp` is an original background illustration generated with the
built-in `image_gen` tool, inspired by the owner's Himeji Castle photo reference.
It depicts a twilight castle and courtyard behind the existing ninja and targets.
Exported with Sharp to 1536×768 WebP (quality 88, 157,580 bytes); no runtime network
request or AI service is needed. CSS adds a subtle contrast overlay and crops with
`cover`. The supplied photograph is not bundled in the game.

### Final castle prompt

Use case: stylized-concept. Asset type: a background-only illustration for the rectangular throwing arena in the NOC Ninja browser game. Create a wide landscape approximately 2:1 aspect ratio, inspired by Himeji Castle as in the user's reference: recognizable white plaster Japanese castle keep, many gracefully layered charcoal tile roofs and curved gables, smaller connected white turrets, massive pale stone foundation, carefully shaped pine trees. Style: polished hand-painted 2D game environment with restrained cel-shaded forms and clean architectural detail, compatible with a chibi ninja sprite. Lighting: blue-hour twilight, soft cool white castle walls, muted indigo sky and deep green pines, subtle warm windows. Composition: view from an open stone courtyard; castle keep in the middle distance just left of center, upper roofs clearly visible with breathing room to the top edge; pines frame the sides. Lower third is a quiet dark stone courtyard with low visual detail where the existing ninja will stand at bottom center. Keep the top 20 percent fairly quiet for three circular answer targets overlaid by the app. Castle should remain recognizable and visible behind the character without overwhelming the targets. Fill the entire frame, no border. Background ONLY: no ninja, no people, no target buttons, no shuriken, no UI, no lettering, no logos, no watermark. Opaque background.

## Character sprites

Generated with the built-in `image_gen` tool on 2026-11-17; no API/CLI fallback.
Project assets: `assets/ninja.png` and `assets/shuriken.png`, both transparent PNGs.
The supplied Adobe Stock URL was inspected as a style reference only; the stock image is not
bundled or used as a game asset. The original generated sprites use bold outlines, cel shading,
charcoal/navy clothing and metal, red accents and cyan eyes.

## Final ninja prompt

Create an original full-body chibi ninja GAME SPRITE, isolated on a truly transparent background.
Style reference description: bold thick black clean cartoon outlines, glossy cel shaded
charcoal/navy hood and mask, bright expressive cyan eyes, vivid red headband with flying ribbon
ends and red waist sash, compact heroic proportions and wide confident stance. Original design,
no copied stock image, no text, no watermark. Facing mostly forward with body turned slightly
right, one hand extended in a ready-to-throw pose, other fist at waist, athletic legs planted.
Polished premium 2D arcade mascot, strong readable silhouette at 150px. Full body with space around
edges, centered. No floor, no shadow backdrop, no scene, no extra icons. Save as project sprite.

## Final shuriken prompt

Use case: stylized-concept. Asset: one isolated SHURIKEN game sprite, front-on orthographic flat
centered view on truly transparent background. Original polished 2D arcade cartoon art matching
a charcoal/navy ninja with red headband and cyan eyes: thick black outlines, crisp glossy cel
shading, four swept angular steel blades, dark navy metal faces with bright silver bevels, small
red circular hub around a transparent round center hole. Symmetric balanced silhouette and bold
readable at 40px. One single throwing star only, full silhouette comfortably inside frame. No ninja,
no hands, no ribbons, no background, no glow outside outline, no text, no watermark.


## Arcade promotional card — updated 2026-11-19

`arcade-card.webp` is the 1280×720 listing image. It now advertises Guided NOC Patrol,
three incidents, twelve decisions and a new order each patrol. The listing avoids provenance
qualifiers; the SVG, preview text and rendered WebP use the same wording. Existing generated ninja
and shuriken sprites are reused; the text/layout is a code-authored composition.

`arcade-card.svg` is the editable source and references the sibling sprite PNGs.
`arcade-card.html` previews that SVG as an object over HTTP, with the WebP as fallback.
The WebP was exported using Sharp (quality 95) with the PNG references embedded in memory
for rasterization, then visually checked. Sharp was installed only in a temporary directory;
the game still requires no package installation or build step. Regenerate the WebP when
changing the SVG; publishing uses the WebP, not the preview HTML.
