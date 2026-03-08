# IDE Features and Rules (Whole Project)
 
 > **Generated from Blueprint:** 8f47e0f4-336d-4a7b-bbbf-00bf427116d4  
 > **Brand/Project Name:** Villant Loodgieter  
 > **Target Framework:** Next.js  
 > **Version:** 1.2.18
 > **Content language:** Write all content (copy, meta, blog posts) in en.
 
 ---
 
 ## Features and Rules
 
 - **Section-aligned writing:** Content is mapped to required blocks (e.g. Value Proposition, Benefits, How It Works, Proof, FAQ); block order follows the selection rule.
 - **SEO master rules:** Constraints and keyword engineering from the Blueprint must be applied; do not invent or remove required sections.
  - **Structure variants:** Use `required_blocks` and `allowed_orders` from the Blueprint; choose the order that best fits the page type and niche.
  - **Connect pages:** Add internal links (nav, footer, in-content) so every page links to 2–3 other relevant pages.
  - **Anti-generic and tone:** Follow persona, banned phrases, and reading-level constraints; do not destroy existing content.
 - **Values from brain.json only:** All brand name, contact, address, phone, email, opening hours, keywords, claims, and disclaimers MUST be copied exactly from brain.json. Do NOT invent, paraphrase, or approximate.
 
 **⚠️ CRITICAL: This document is DERIVED from the Blueprint JSON. brain.json is the ONLY source for values. Use EXACT values—never invent. Execute instructions as written.**
 
 ---

## Execution Role & Safety Rules

**You are an IDE execution agent.** Your role is to apply Blueprint instructions and brain.json values to existing codebase files.

### Values Source of Truth (CRITICAL)

1. **brain.json and blueprint.md are the ONLY sources** — All values (brand name, keywords, contact, address, phone, email, opening hours, claims, disclaimers, tone, structure) MUST come EXACTLY from these files.
2. **Do NOT invent, paraphrase, or approximate** — Use literal values. If a field is empty in brain.json, do not fill it with invented content.
3. **Do NOT extrapolate** — Do not infer values not present in the config (e.g. if phone is missing, do not add a placeholder number).
4. **Exact copy** — For meta title, meta description, headings, body copy: use the exact strings from configuration_meta, user_profile, entity_semantic_layer, and uninventable_data.

### Non-Negotiable Constraints

1. **READ-ONLY on Blueprint & Brain** — Both JSON sources are immutable. Do not suggest changes to them.
2. **NO Content Generation** — Do not invent text, slogans, or copy. Use ONLY values from brain.json/blueprint.md.
3. **NO Deletion Without Instruction** — Never remove existing code unless explicitly required.
4. **Preserve Structure** — Maintain existing file organization, imports, and dependencies.
5. **Atomic Changes** — Each edit should be reversible and testable independently.
6. **Report Conflicts** — If instructions conflict with existing code patterns, report instead of guessing.

### Execution Boundaries

- ✅ Insert content using EXACT values from brain.json
- ✅ Create new files following existing patterns
- ✅ Modify specific sections as instructed
- ❌ Invent contact, address, claims, or disclaimers
- ❌ Refactor unrelated code
- ❌ Change project configuration
- ❌ Install new dependencies unless explicitly required

## Framework Detection Rules (Next.js)

Before making any changes, verify the project structure:

1. Check for `/app` directory → App Router (Next.js 13+)
2. Check for `/pages` directory → Pages Router (legacy)
3. If both exist, prioritize `/app` unless page exists only in `/pages`
4. Look for `next.config.js` or `next.config.ts` to confirm Next.js project
5. Check `package.json` for `next` dependency version

### Validation Checklist

- [ ] Confirmed framework type matches: **Next.js**
- [ ] Identified primary content directory
- [ ] Located existing page/template files
- [ ] Noted project-specific conventions



## File & Page Discovery Instructions (Whole Project Scope)

Locate ALL relevant content pages/templates in the project:

1. App Router: `/app/**/page.tsx` or `/app/**/page.jsx`
2. Pages Router: `/pages/**/*.tsx` or `/pages/**/*.jsx`
3. Layout files: `/app/**/layout.tsx` for shared layouts
4. Components: `/components/**/*.tsx` or `/src/components/**/*.tsx`
5. Do NOT modify `node_modules`, `.next`, or config files

### Discovery Protocol

1. Scan the entire project structure
2. Identify all pages that match the content strategy (e.g. all Product Pages, or all Service Pages)
3. List the target files and their current state
4. Apply the Blueprint instructions to EACH identified file

## Content Mapping Rules

1. Map each required_block to a React component or section
2. Insert content inside existing component JSX, not as raw HTML
3. Preserve existing `className`, `id`, and event handlers
4. Use semantic HTML elements within React components
5. Maintain existing imports and component structure

### Required Content Blocks

Map these blocks to Next.js elements:

1. **hero** → Create/locate corresponding section
2. **value_prop** → Create/locate corresponding section
3. **benefits** → Create/locate corresponding section
4. **services** → Create/locate corresponding section
5. **proof** → Create/locate corresponding section
6. **service_areas** → Create/locate corresponding section
7. **cta** → Create/locate corresponding section
8. **how_it_works** → Create/locate corresponding section
9. **faq** → Create/locate corresponding section

### Allowed Block Orders

Use one of these orderings (select based on: For the Homepage, use the Benefits-first order; for specific service pages, use the Services-first order; for the About/Certified Partner page, use the Proof-first order; and for dedicated local area pages, use the Service Areas-first order.):

**Option 1:** hero → value_prop → benefits → services → proof → service_areas → how_it_works → faq → cta

**Option 2:** hero → value_prop → services → benefits → proof → service_areas → how_it_works → faq → cta

**Option 3:** hero → value_prop → proof → benefits → services → service_areas → how_it_works → faq → cta

**Option 4:** hero → value_prop → service_areas → services → benefits → proof → how_it_works → faq → cta

### SEO Constraints

- **Primary Keyword:** Vaillant loodgieter Brussel
- **Secondary Keywords:** [from Blueprint]
- **Keyword Placement Rules:** {}

### Injection Rules

1. Never replace entire page.tsx — modify specific sections only
2. Preserve `'use client'` or `'use server'` directives
3. Keep existing metadata exports (`generateMetadata`, `metadata`)
4. Insert content within return statements, inside layout wrappers
5. Respect existing CSS modules or Tailwind class conventions

### Mandatory Auto-Injection Rules (AI Writer Parity)

If the following structures are missing, you MUST inject them (following the style of the AI Writer's auto-fixer):

1. **FAQ Section**: If missing, inject a semantic details/summary FAQ section relevant to the page topic.
2. **Benefits Grid**: If "Why Us" or Benefits are missing, inject a features/benefits grid.
3. **Social Proof**: If no testimonials/reviews exist, inject a Social Proof section.
4. **Local Context**: If the target location is not mentioned, inject a footer line: "Proudly serving [Location] and surrounding areas."

## Anti-Generic Enforcement Reminder

The following quality gates MUST be satisfied:

### Mandatory Elements

- **specific mechanism:** Minimum 1 instance(s) required
- **proof details:** Minimum 3 instance(s) required
- **objections addressed:** Minimum 2 instance(s) required
- **local adaptation:** Minimum 1 instance(s) required

### Enforcement Rules

1. No generic adjectives without mechanism or proof
2. If a detail is unknown, explicitly state uncertainty
3. No repeated CTA without new value

### Validation

Before completing execution:
- [ ] Count each mandatory element type
- [ ] Verify no generic phrases remain
- [ ] Confirm all rules are satisfied

## Tone & Style Constraints

- **Persona:** Elegant, premium





## Compliance Requirements





## Execution Steps

Execute in exact order. Do not skip steps.

### **STEP 1: Verify Framework**
   - Confirm project is Next.js
   - Run detection checks from Framework Detection section
   - STOP if framework mismatch detected

### **STEP 2: Locate Target Files (Project-Wide)**
   - Scan project for all relevant content pages
   - Identify every file that requires update based on the strategy
   - List all target files

### **STEP 3: Analyze Existing Structure**
   - For EACH target file, map current content
   - Identify insertion points
   - Note elements to preserve

### **STEP 4: Plan Block Insertion**
   - Required blocks: hero, value_prop, benefits, services, proof, service_areas, cta, how_it_works, faq
   - Apply block order per selection_rule
   - Map blocks to locations in EACH file

### **STEP 5: Apply Content Strategy**
   - Persuasion goal: Transactional
   - Search Intents: Transactional
   - Decision stage: evaluation
   - Framework options: AIDA, PAS, BAB, Problem-Solution, Jobs-to-be-Done

### **STEP 6: Execute Insertions**
   - Insert blocks in selected order
   - Preserve existing content
   - Apply SEO constraints
   - Connect pages with each other: add navigation links, footer links, and contextual anchor links between related pages (every page should link to at least 2–3 other pages)

### **STEP 7: Validate Anti-Generic**
   - Check mandatory elements count
   - Verify rule compliance
   - Remove any generic fallback text

### **STEP 8: Final Review**
   - Confirm no structural damage
   - Verify all blocks present
   - Test page renders correctly

---

## Execution Complete Checklist

- [ ] Framework verified as Next.js
- [ ] All required blocks inserted
- [ ] Block order follows selection rule
- [ ] SEO constraints applied
- [ ] Anti-generic rules satisfied
- [ ] Tone/style constraints followed
- [ ] No existing content destroyed
- [ ] Page renders without errors

**END OF IDE FEATURES AND RULES**