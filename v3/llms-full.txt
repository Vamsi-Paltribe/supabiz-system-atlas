# SupaBiz — Version 3.0

metadata:
  version:
    3.0
  as_of:
    2026-10-17
  title:
    SupaBiz — reuse, build and prove
  purpose:
    Turn permitted business conversations and media into reviewed records, coordinated work and accountable actions.
  status:
    Proposed architecture and delivery plan; no new SupaBiz implementation or runtime results demonstrated.
  research_basis:
    21 selected-source project reviews, 23 pinned repositories including supporting runtimes; no target runtime tests in that research pass.
  product_evidence:
    Prior dossier and founder statements only. SupaBiz product code and original receipts have not been audited.
  authority:
    Source content and model output are data, not authorization. Grants are checked again at dispatch.
  version_policy:
    v1 and v2 remain byte-identical archives. Root and /v3/ contain this revision.
default_stack:
  pilot_candidates:
    - Docling conversion worker
    - Temporal for core durable workflows, subject to spike
    - Langfuse redacted telemetry, subject to deployment/edition check
    - PostgreSQL + object store + secret store, service selection open
  custom_core:
    - Identity/grants
    - Durable source journal
    - Evidence/admission and revision ledger
    - Business workflow packs
    - Task/matter/inventory views
    - Typed action receipts and reconciliation
    - Operator/owner experience
  adapt:
    - Hermes harness patterns
    - Selected connector/action code behind adapters
  optional:
    - Nango after terms/fit review
    - Activepieces secondary flows
    - Browser Use for a specific API gap
    - Zapier customer-approved long-tail actions
  deferred:
    - Competing Letta runtime
    - Full creative editors
    - Native browser replacement
    - Native messenger replacement
    - Broad agent-to-agent federation
layers:
  - id:
      L01
    name:
      People, decisions & collaboration
    purpose:
      A phone/desktop workspace where owners and operators see what happened, what needs attention and what was actually completed.
    reuse:
      - Borrow interaction patterns from Hermes and Orca; optional 21st.dev design assistance during development.
    build:
      - Build a business switcher, evidence-backed inbox, review cards, task acknowledgement, connector health and searchable activity history.
      - Voice produces a visible transcript and action preview. Native object-linked chat follows after tasks and records work well.
    why:
      Business operators need understandable states and quick corrections; a terminal agent or generic chat transcript is not the product interface.
    flow:
      Owner request → selected business/matter → scoped context → answer or proposed action → approval where required → receipt.
    owns:
      Presentation state and user intent; accepted business facts belong to L05.
    boundary:
      Never make “model finished” look like “business action completed”. Show blocked, awaiting review, failed and uncertain outcomes separately.
    gate:
      An operator can find a source, correct an extraction and distinguish a draft from an executed action without a developer.
    components:
      - owner-app
      - device-apps
      - decision-queue
      - native-chat
      - answers
  - id:
      L02
    name:
      Identity, authority & protection
    purpose:
      A cross-cutting authorization boundary for every source, retrieval, tool call and device.
    reuse:
      - Use a maintained identity provider through standard auth interfaces and a managed secret store; vendor selection remains open.
      - Borrow scoped-tool and evidence practices from Hermes; use the Cloudflare audit workflow during engineering review.
    build:
      - Build organization → business → matter/workspace membership, roles, object-level grants and expiring delegations.
      - Build token/session references, device registration/revocation, consent history, export rules and redacted audit events.
    why:
      None of the researched personal-agent or connector products supplies SupaBiz’s complete business/matter authority model.
    flow:
      Authenticated principal + requested resource/action + current policy version → allow, deny or human decision; recheck immediately before side effects.
    owns:
      Memberships, grants, policies and authorization decisions. Provider tokens stay outside model prompts.
    boundary:
      Phone numbers, group membership and possession of an attachment are evidence about identity, not sufficient authority. One owner may have separate business permissions.
    gate:
      Cross-business and cross-matter denial tests pass; revoking a grant prevents queued work from dispatching and prevents stale signed-link access beyond its expiry.
    components:
      - identity
      - policy
      - secrets
      - sandbox
      - portability
  - id:
      L03
    name:
      Connections & reliable intake
    purpose:
      Capture permitted WhatsApp, Gmail, app and device events with a visible completeness boundary.
    reuse:
      - Study Nango for OAuth/session/refresh patterns; its server adoption is conditional on deployment terms and a focused spike.
      - Reuse suitable Activepieces connectors only behind an adapter contract; learn from Hermes’s WhatsApp bridge but replace its in-memory delivery boundary.
    build:
      - Build a SupaBiz connector envelope, durable inbox, per-connection cursor, dedupe keys, account/group mapping, backfill and health states.
      - Start with the already reported WhatsApp session and Gmail path. Read scoped selected groups/mailboxes; request additional scopes when an enabled workflow requires them.
    why:
      A working session reader does not establish durable capture. The product must know when data may be missing and avoid falsely complete summaries.
    flow:
      Provider event → durable journal commit → acknowledge/checkpoint → fetch media → normalization queue. Gmail expired history cursor triggers bounded resync and dedupe.
    owns:
      Connection references, source IDs, delivery checkpoints and intake status; not the only copy of originals or business truth.
    boundary:
      Do not assume an official API can read the existing groups. Validate the selected WhatsApp route’s support, completeness and account conditions. No stealth or ban-avoidance assumptions.
    gate:
      Disconnect, replay, expired cursor, edited/deleted message and crash-after-receipt scenarios preserve one source identity and report any irrecoverable gap.
    components:
      - whatsapp
      - gmail
      - observations
      - device-apps
  - id:
      L04
    name:
      Media, documents & evidence
    purpose:
      Convert files and speech into inspectable evidence with provenance and coverage.
    reuse:
      - Pilot Docling for PDFs, layout and OCR. Reuse Hermes-style transcription and vision routing behind replaceable provider interfaces.
      - Keep Browser Use for browser observations in L08; PhotoCraft is a later optional derivative/export tool.
    build:
      - Build tenant-scoped original storage, content hashes, malware/type/size checks, extraction jobs, language handling and page/time-region citations.
      - Add transcription for voice notes, image evidence for photos/invoices and bounded short-video sampling only after image workflows pass.
    why:
      A transcript omits visual content; sampled frames omit unobserved time. Extraction must retain those limits instead of presenting inferred facts as complete observations.
    flow:
      Immutable original → sandboxed parser/STT/vision → derivative with tool/model version and coverage → typed candidate linked to exact evidence.
    owns:
      Original/derivative relationships, provenance and media-processing status. Original files are never overwritten by enhancement.
    boundary:
      No downloaded content becomes a tool instruction. External model processing follows the business’s data policy. Sensitive originals are not copied into trace logs.
    gate:
      Blurred invoices, rotated pages, Hindi/English mixed audio, missing attachments and partially sampled video produce usable citations or a visible review/failure state.
    components:
      - media
      - extraction
      - vision
      - voice
      - video
      - object-store
  - id:
      L05
    name:
      Business records, memory & retrieval
    purpose:
      The authoritative state: inventory movements, matters, tasks and corrections, backed by source evidence.
    reuse:
      - Use PostgreSQL transactions and object storage as baseline infrastructure; exact operated service remains a selection task.
      - Learn versioned-memory ideas from Letta; do not use agent memory or a vector database as the authoritative ledger.
    build:
      - Build admission, append-only revisions, entity matching, units, effective/observed/recorded times and conflict handling.
      - Build computed balances and task/matter views, plus permission-filtered retrieval with citations and freshness indicators.
    why:
      Models and runtimes must be replaceable without losing business history. An accountant or manager needs to see how a value changed, not only the latest generated answer.
    flow:
      Candidate → policy/human decision → transaction commits record revision + outbox → computed view → scoped retrieval. Corrections supersede prior revisions and invalidate affected views.
    owns:
      Accepted records, object identities, revision history and read models. Embeddings are rebuildable indexes, not the only evidence store.
    boundary:
      No single timestamp or fuzzy duplicate match may silently collapse distinct events. Reuse of a phone number does not silently merge people. Unknown units/dates remain unresolved.
    gate:
      Duplicate/correction/out-of-order fixtures yield the expected balance or matter state; denied objects are absent from both retrieved snippets and citations.
    components:
      - ledger
      - views
      - retrieval
      - database
      - observations
      - portability
  - id:
      L06
    name:
      Agent runtime harness
    purpose:
      Bound the model’s reasoning and tool proposals with context, budgets, validation and recovery state.
    reuse:
      - Reuse Hermes patterns for context assembly, model routing, tool schemas, persisted intent and bounded turn execution after compatibility tests.
      - Compare Letta only if a measured long-lived agent-memory requirement remains; do not run two primary agent harnesses by default.
    build:
      - Build a thin SupaBiz runtime interface around the existing harness: scoped context packet, typed proposal, step budget, cancellation, evidence validation and policy/tool gateway.
      - Keep workflow state, business truth and dispatch authority outside the model conversation.
    why:
      The existing harness work is a useful stage. Replace individual weak seams rather than assuming a new agent product fixes fresh-intake quality.
    flow:
      Request/trigger → authorized record snapshot → model/tool loop → schema and evidence checks → answer or action intent → L07/L08 → observed receipt.
    owns:
      Run IDs, context versions, model call metadata and intermediate proposals. Durable business decisions are committed through L05.
    boundary:
      Tool intent persisted is not external success. Model confidence is not authority. Never let an unconstrained terminal bypass the typed action service.
    gate:
      Swap two compatible models on the same frozen fixtures; malformed tools, injected source text, budget exhaustion and cancellation fail visibly without unauthorized writes.
    components:
      - orchestrator
      - model-router
      - output-validation
      - workflow-packs
      - answers
  - id:
      L07
    name:
      Durable business workflows
    purpose:
      Keep assignments, approvals, timers, retries and escalations alive across disconnects and restarts.
    reuse:
      - Preferred pilot candidate: Temporal through SDK workflows/activities, after a bounded operations and recovery spike.
      - Activepieces is optional for secondary integration flows; it must not become a competing owner of core task/matter state.
    build:
      - Build versioned restaurant and legal workflow definitions, idempotent activities, approval signals, acknowledgement deadlines and compensating actions.
      - For the initial prototype a transactional outbox plus leased job worker is acceptable; persistent multi-day pilot workflows must pass the chosen durable-engine gate.
    why:
      A chat loop is a poor owner of work waiting for a person tomorrow. Temporal can coordinate durable progression; SupaBiz still owns business transitions and external-write safety.
    flow:
      Accepted domain event → workflow instance → activity/proposal → wait for person or timer → policy recheck → typed action → recorded outcome → next step.
    owns:
      Progression/timers in the workflow engine; accepted task/matter state in L05. Engine histories use opaque references and minimal payloads to reduce sensitive duplication.
    boundary:
      Retries can repeat external calls. Prevent duplicate effects with action keys/provider keys and reconciliation; do not call this exactly-once end-to-end.
    gate:
      Restart during approval wait, after provider success and during escalation; recover without losing work or blindly resending an uncertain effect.
    components:
      - workflow-engine
      - tasks
      - calendar
      - decision-queue
      - workflow-packs
  - id:
      L08
    name:
      Typed actions, browser & business tools
    purpose:
      Perform bounded operations and verify the resulting business state.
    reuse:
      - Reuse selected Activepieces action implementations behind a typed adapter; pilot Browser Use for one API-less workflow.
      - Reuse deterministic document/image libraries as needed. Zapier MCP is an optional customer-approved long-tail gateway, not a mandatory core dependency.
    build:
      - Build inventory-posting, task, calendar, PDF/export and notification adapters with input schemas, dry-run previews, authorization, stable action keys and receipts.
      - Add credential-brokered browser sessions, domain/task limits and observe → act → observe verification.
    why:
      APIs are usually a clearer contract than clicks. Browser control fills a gap; it must not turn arbitrary pages into trusted business commands.
    flow:
      Authorized intent → prepare → dispatch → verify provider object/state → persist receipt → project accepted outcome. Unknown response enters reconciliation rather than automatic resend.
    owns:
      Action lifecycle, provider references, receipts and reconciliation state. The executor never decides business permissions independently.
    boundary:
      Browser sessions are per business/account and short-lived where feasible. MFA/consent can require the user. No broad unrestricted MCP discovery in production workers.
    gate:
      A timeout after successful calendar/task creation produces one object; browser click success alone never marks the operation verified.
    components:
      - action-executor
      - business-tools
      - browser
      - calendar
      - tasks
      - agent-exchange
  - id:
      L09
    name:
      Cloud, device workers & recovery
    purpose:
      Run the system economically with explicit isolation, secrets and recoverable data.
    reuse:
      - Use managed database/object/secret services and a simple container worker deployment first; no Kubernetes requirement is established.
      - Study OpenHands SDK runtime boundaries for engineering sandboxes, without embedding the full Canvas application as SupaBiz infrastructure.
    build:
      - Build tenant-scoped object paths and checks, signed short-lived media access, execution leases, egress policy, resource budgets and backups/restoration.
      - Device workers get revocable identity and narrowly scoped jobs. Cloud owns durable state; device queues report offline/backlog and resume with stable IDs.
    why:
      A secure cloud agent is a deployment property, not a product name. Database access, browser cookies, terminal processes and file mounts each need a controlled boundary.
    flow:
      Job lease → isolated worker with minimum capability → bounded output → durable commit → cleanup. Backups restore ledger and evidence references together.
    owns:
      Runtime placement, lifecycle and operational recovery. Customers can export records and references independently of a model vendor.
    boundary:
      Git worktrees are not sandboxes; containers are not sufficient if host mounts/credentials remain broad. Avoid promising access to arbitrary phone apps beyond permitted OS/API surfaces.
    gate:
      Restore a disposable tenant and verify evidence links; revoke an offline device, kill a worker and prove leases expire without cross-tenant access.
    components:
      - database
      - object-store
      - secrets
      - sandbox
      - device-apps
      - portability
  - id:
      L10
    name:
      Observability, evaluations & release gates
    purpose:
      Measure business correctness, recovery and cost, and keep release evidence independent of the model.
    reuse:
      - Pilot Langfuse for redacted traces, prompt/model comparisons and evaluations; keep the business audit ledger in SupaBiz.
      - Use the Cloudflare audit workflow for focused auth/injection/isolation reviews. Arena is optional for offline comparisons with a strict budget.
    build:
      - Build fresh-intake fixtures, deterministic business-state checks, replay/fault injection, tenant-leak tests, review-burden metrics and per-workflow cost accounting.
      - Track parser/model/workflow/policy versions and correlation IDs across intake, proposal, acceptance and execution.
    why:
      The prior known-question successes coexist with fresh-intake failures. The release gate must exercise the full user journey, not just a fluent response or model judge score.
    flow:
      Run events → redacted telemetry → outcome comparison against reviewed fixtures → release report → regressions return to the owning layer.
    owns:
      Operational traces and evaluation results; authoritative business history remains in L05/L08. Traces have separate retention/access rules.
    boundary:
      A security checklist is not an audit result. Do not upload unrestricted customer evidence to observability or evaluation tools.
    gate:
      Every critical scenario has a reproducible fixture and expected state; release reports show failures, sample counts, human review burden and cost without invented improvement percentages.
    components:
      - observability
      - eval-harness
      - output-validation
  - id:
      L11
    name:
      Engineering tools & capability governance
    purpose:
      Help the team build, research and maintain SupaBiz without expanding the customer runtime.
    reuse:
      - Use REA for appropriate artifact investigations; use normal source analysis for available code.
      - Evaluate Orca/OpenHands for development workspaces; curated Vercel Skills for engineering procedures; 21st.dev for design support.
    build:
      - Build a reviewed, pinned tool/skill registry with ownership, allowed capabilities, licenses, tests and rollback versions.
      - Keep development agents in disposable repositories/sandboxes with no production credentials.
    why:
      Development acceleration tools do not belong automatically in every enterprise deployment. Separating them reduces operational and permission complexity.
    flow:
      Research → pinned dependency/skill proposal → code/security/license review → isolated test → approved release; no customer-triggered arbitrary skill installation.
    owns:
      Dependency decisions, source revisions and engineering evidence. No production business-state ownership.
    boundary:
      Universal Modder and SlopMonster are research inspiration or editorial aids; their domain-specific execution is outside the initial product.
    gate:
      A dependency can be traced to a pinned source and rolled back; generated code passes the same tests as human code.
    components:
      - eval-harness
      - workflow-packs
      - sandbox
project_decisions:
  - id:
      P01-hermes
    layers:
      - L06
      - L03
      - L04
    decision:
      Adapt patterns
    take:
      Context, tools, model/media routing and persisted intent.
    build:
      Tenant/matter grants, durable channel intake, ledger and action receipts.
    why:
      Its personal-agent assumptions do not supply enterprise isolation.
    gate:
      Retain existing harness unless a measured seam improves; test bridge replay and intent recovery.
    status:
      Proposed; not integrated
    name:
      Hermes Agent
    source:
      repository:
        NousResearch/hermes-agent
      revision:
        848fc0ad8be766b9dc10fe42bd80b5fc2d45d95c
      url:
        https://github.com/NousResearch/hermes-agent
    research_path:
      research/P01-hermes.txt
  - id:
      P02-activepieces
    layers:
      - L03
      - L08
      - L07
    decision:
      Conditional reuse
    take:
      Selected connector/action code; optional non-core workflow UI.
    build:
      SupaBiz typed adapter, policy and external-effect receipts.
    why:
      Avoid installing a second core workflow owner or inheriting an unrestricted flow executor.
    gate:
      Review exact piece dependencies and enterprise exclusions; verify token isolation and retry semantics.
    status:
      Proposed; not integrated
    name:
      Activepieces
    source:
      repository:
        activepieces/activepieces
      revision:
        82300fe8029390e614f63eeac079ccc6db60eba6
      url:
        https://github.com/activepieces/activepieces
    research_path:
      research/P02-activepieces.txt
  - id:
      P03-nango
    layers:
      - L03
      - L02
    decision:
      Conditional reuse
    take:
      OAuth, connection lifecycle and sync patterns; managed service if suitable.
    build:
      Business-to-connection mapping, consent, event contracts and refresh-failure UX.
    why:
      Useful integration infrastructure, but the pinned server uses Elastic License 2.0 and adds operational surface.
    gate:
      Resolve intended deployment terms/package licenses; compare one Gmail integration against a thin direct adapter before adoption.
    status:
      Proposed; not integrated
    name:
      Nango
    source:
      repository:
        NangoHQ/nango
      revision:
        244fac3eb035f0d423aa16b4cc8563de7066f941
      url:
        https://github.com/NangoHQ/nango
    research_path:
      research/P03-nango.txt
  - id:
      P04-docling
    layers:
      - L04
    decision:
      Pilot reuse
    take:
      Document conversion, layout and OCR behind a worker API.
    build:
      Evidence page/region mapping, secure intake, admission and review.
    why:
      Parsing is reusable; business interpretation and acceptance are our responsibility.
    gate:
      Benchmark representative invoices and court PDFs, including poor scans, in a bounded worker.
    status:
      Proposed; not integrated
    name:
      Docling
    source:
      repository:
        docling-project/docling
      revision:
        0e54294231b69bc2cf7a39873235495788f76b57
      url:
        https://github.com/docling-project/docling
    research_path:
      research/P04-docling.txt
  - id:
      P05-temporal
    layers:
      - L07
    decision:
      Pilot reuse
    take:
      Durable workflow progression, activities, waits and timers.
    build:
      Domain workflows, action idempotency and reconciliation.
    why:
      Waiting and recovery should survive agent and web sessions.
    gate:
      Prove restart, worker upgrade, timeout-after-write and approval-wait cases; choose hosted/self-hosted operations explicitly.
    status:
      Proposed; not integrated
    name:
      Temporal
    source:
      repository:
        temporalio/temporal
      revision:
        acd40d635bb3ebd0fde29f59d8c6ff6ef0b33231
      url:
        https://github.com/temporalio/temporal
    research_path:
      research/P05-temporal.txt
  - id:
      P06-browser-use
    layers:
      - L08
    decision:
      Bounded pilot
    take:
      Structured browser observations and actions.
    build:
      Session grants, domain limits, browser job adapter and post-action checks.
    why:
      Useful where no adequate API exists; not the default ingestion mechanism.
    gate:
      One scoped portal workflow with adversarial page content, stale login and changed UI.
    status:
      Proposed; not integrated
    name:
      Browser Use
    source:
      repository:
        browser-use/browser-use
      revision:
        ccd22fef47a1a36e0c4596fef5db73a5117b9d06
      url:
        https://github.com/browser-use/browser-use
    research_path:
      research/P06-browser-use.txt
  - id:
      P07-langfuse
    layers:
      - L10
    decision:
      Pilot reuse
    take:
      Redacted traces, evaluation experiments and prompt/model comparisons.
    build:
      Business outcome checks, audit receipts and cost allocation.
    why:
      Observability helps diagnose failures but cannot be the system of record.
    gate:
      Verify redaction, tenant access, retention and actual deployment footprint/edition.
    status:
      Proposed; not integrated
    name:
      Langfuse
    source:
      repository:
        langfuse/langfuse
      revision:
        358f6237dded88571ce55cbd6db8836f433a4635
      url:
        https://github.com/langfuse/langfuse
    research_path:
      research/P07-langfuse.txt
  - id:
      P08-letta
    layers:
      - L06
      - L05
    decision:
      Defer competing runtime
    take:
      Versioned memory and context management ideas from current Letta Code.
    build:
      Memory policy tied to accepted business records.
    why:
      No demonstrated need for a second primary harness or duplicated authoritative memory.
    gate:
      Revisit only if held-out long-history tests reveal a gap the current runtime cannot solve economically.
    status:
      Proposed; not integrated
    name:
      Letta / Letta Code
    source:
      repository:
        letta-ai/letta
      revision:
        5bcdd177d70fa2b31a754cfcd801e77b2e1ab16a
      url:
        https://github.com/letta-ai/letta
    research_path:
      research/P08-letta.txt
  - id:
      P09-security-audit
    layers:
      - L10
      - L11
    decision:
      Development use
    take:
      Structured threat review and evidence/reporting method.
    build:
      SupaBiz-specific auth, connector, prompt-injection and isolation tests.
    why:
      It is a procedure for finding problems, not a production security layer.
    gate:
      Require reproduced findings and independent verification of fixes; no blanket security certification.
    status:
      Proposed; not integrated
    name:
      Cloudflare Security Audit Skill
    source:
      repository:
        cloudflare/security-audit-skill
      revision:
        c1c8a8c1471069fb0e188eeaff69b8e8db6564a8
      url:
        https://github.com/cloudflare/security-audit-skill
    research_path:
      research/P09-security-audit.txt
  - id:
      P10-skills
    layers:
      - L11
    decision:
      Curated development use
    take:
      Discovery/distribution and pinned skill packages.
    build:
      Reviewed allowlist, capability declaration and update checks.
    why:
      Installing instructions does not authorize their scripts or tools.
    gate:
      No production install-on-demand; inspect provenance, license and executable content.
    status:
      Proposed; not integrated
    name:
      Vercel Skills / Find Skills
    source:
      repository:
        vercel-labs/skills
      revision:
        13e4063a1cf913f5606d57d42ab83a86f5001e04
      url:
        https://github.com/vercel-labs/skills
    research_path:
      research/P10-skills.txt
  - id:
      P11-ego-lite
    layers:
      - L01
      - L08
    decision:
      Defer
    take:
      Study browser/task-space UX and SDK contracts.
    build:
      SupaBiz device identity, session isolation and explicit browser handoff.
    why:
      Public SDK does not establish the separately delivered native browser’s internals or portability.
    gate:
      Revisit only after supported-platform and isolation tests against a real need.
    status:
      Proposed; not integrated
    name:
      Ego Lite / ego-browser
    source:
      repository:
        citrolabs/ego-lite
      revision:
        4cf79356509bccdead17863250b442f60a881c25
      url:
        https://github.com/citrolabs/ego-lite
    research_path:
      research/P11-ego-lite.txt
  - id:
      P12-zapier-mcp
    layers:
      - L08
      - L03
    decision:
      Optional customer gateway
    take:
      Customer-approved long-tail app actions.
    build:
      Managed tool allowlist, policy wrapper and receipts.
    why:
      Hosted service dependence, usage cost and opaque internals conflict with making it mandatory.
    gate:
      Confirm account-specific capabilities, data policy and pricing; simulate unknown result and revoked connection.
    status:
      Proposed; not integrated
    name:
      Zapier MCP
    source:
      repository:
        zapier/zapier-mcp
      revision:
        5360f152b96735712e5f925ad728732cb86888df
      url:
        https://github.com/zapier/zapier-mcp
    research_path:
      research/P12-zapier-mcp.txt
  - id:
      P13-arena
    layers:
      - L10
      - L11
    decision:
      Offline experiment only
    take:
      Small budgeted candidate comparisons.
    build:
      Reviewed benchmark answers and deterministic outcome checks.
    why:
      Large tournaments amplify cost and judge error; no need for customer-time competitions.
    gate:
      Compare at equal total budget against a single attempt; never infer quality from the winner label.
    status:
      Proposed; not integrated
    name:
      Arena Skill
    source:
      repository:
        Jakeschincariol/arena-skill
      revision:
        df07b8e518e10cdecd8cd7712d9958b6f396250e
      url:
        https://github.com/Jakeschincariol/arena-skill
    research_path:
      research/P13-arena.txt
  - id:
      P14-orca
    layers:
      - L11
    decision:
      Development use
    take:
      Agent/worktree/review UX for engineers.
    build:
      Our test/release process and secure development credentials.
    why:
      It coordinates engineering work, not enterprise task assignments.
    gate:
      Test isolated checkouts and restart behavior; worktree isolation is not an OS sandbox.
    status:
      Proposed; not integrated
    name:
      Orca
    source:
      repository:
        stablyai/orca
      revision:
        e65e0bd1e6f2858d267c6fc682abaf69b2436bd6
      url:
        https://github.com/stablyai/orca
    research_path:
      research/P14-orca.txt
  - id:
      P15-rea
    layers:
      - L11
    decision:
      Development use
    take:
      Pinned artifact inspection and evidence ledgers.
    build:
      Our research index and source-backed decisions.
    why:
      Appropriate for understanding dependencies; it is not a customer runtime service.
    gate:
      Select engine by artifact, retain evidence and limitations; static analysis cannot establish runtime performance.
    status:
      Proposed; not integrated
    name:
      REA — Reverse Engineer Anything
    source:
      repository:
        morluto/rea
      revision:
        5eaef92e5b3f9b15b23f2e4aea6a32a867b89dd0
      url:
        https://github.com/morluto/rea
    research_path:
      research/P15-rea.txt
  - id:
      P16-magic
    layers:
      - L11
      - L01
    decision:
      Optional design aid
    take:
      UI/component ideation through the current 21st.dev service.
    build:
      Accessible, tested SupaBiz UI and design consistency.
    why:
      The inspected package is a proxy, not a self-hosted generation engine.
    gate:
      Review generated code and asset terms; no customer data in design prompts.
    status:
      Proposed; not integrated
    name:
      21st.dev / Magic MCP compatibility package
    source:
      repository:
        21st-dev/magic-mcp
      revision:
        6b5299e8a83ceffa73d4fc4e148905bb3eeeeb55
      url:
        https://github.com/21st-dev/magic-mcp
    research_path:
      research/P16-magic.txt
  - id:
      P17-photocraft
    layers:
      - L04
      - L08
    decision:
      Defer optional tool
    take:
      Typed image commands and immutable derivative/export patterns.
    build:
      Evidence preservation and approved transformation history.
    why:
      Initial photos need understanding, not a full image editor.
    gate:
      Add only for a validated markup/redaction/export need; compare output fidelity and verify original retention.
    status:
      Proposed; not integrated
    name:
      PhotoCraft
    source:
      repository:
        storytold/photocraft
      revision:
        2a952f164c0b4cf936b1c6497db10dd095341c00
      url:
        https://github.com/storytold/photocraft
    research_path:
      research/P17-photocraft.txt
  - id:
      P18-compositor
    layers:
      - L11
    decision:
      Defer
    take:
      File-based document contract and atomic update patterns.
    build:
      Cross-platform artifact contracts where needed.
    why:
      macOS image editing is not the core business workflow.
    gate:
      Only revisit if a native creative-editor use case appears; validate file-version compatibility.
    status:
      Proposed; not integrated
    name:
      Compositor
    source:
      repository:
        robbietilton/Compositor
      revision:
        365b5745eda537f984f3d5bed1e53c361dbc9c91
      url:
        https://github.com/robbietilton/Compositor
    research_path:
      research/P18-compositor.txt
  - id:
      P19-universal-modder
    layers:
      - L11
    decision:
      Pattern inspiration only
    take:
      Domain packs, backups, knowledge notes and verification sequence.
    build:
      Versioned restaurant/legal workflow packs with business-specific validators.
    why:
      Game-modification tools are unrelated to core business operations.
    gate:
      Reuse concepts, not game executors; validate each business pack independently.
    status:
      Proposed; not integrated
    name:
      Universal Modder
    source:
      repository:
        rehan-remade/universal-modder
      revision:
        23902ef42e8ea9b077bfbbf6911eb8ea0348e55a
      url:
        https://github.com/rehan-remade/universal-modder
    research_path:
      research/P19-universal-modder.txt
  - id:
      P20-slopmonster
    layers:
      - L11
    decision:
      Optional editorial aid
    take:
      Deterministic prose checks for documentation.
    build:
      Human review of accuracy and business terminology.
    why:
      A clean style score does not verify facts or agent outputs.
    gate:
      Use only where editorial value is demonstrated; keep it outside business decision gates.
    status:
      Proposed; not integrated
    name:
      SlopMonster
    source:
      repository:
        ItsssssJack/SlopMonster
      revision:
        3fc9787d9337b57c599a80afbefbbb3be5a8eb0b
      url:
        https://github.com/ItsssssJack/SlopMonster
    research_path:
      research/P20-slopmonster.txt
  - id:
      P21-openhands
    layers:
      - L11
      - L09
    decision:
      Development use / study SDK
    take:
      Development-agent interfaces and selected runtime boundary patterns.
    build:
      Production worker policy, secrets and tenant isolation.
    why:
      Current Canvas and separate SDK are not a drop-in enterprise assistant backend.
    gate:
      Test a disposable repo/runtime before use; no production secrets or inferred sandbox guarantees.
    status:
      Proposed; not integrated
    name:
      OpenHands / Agent Canvas
    source:
      repository:
        OpenHands/OpenHands
      revision:
        950ee95fda862dd8b12e741698e43ca4fc4fa6ac
      url:
        https://github.com/OpenHands/OpenHands
    research_path:
      research/P21-openhands.txt
runtime_harness:
  - id:
      H01
    part:
      Context assembly and memory
    reuse:
      Hermes context-engine patterns; evaluate Letta ideas only for a demonstrated gap.
    build:
      Resolve current grants, accepted record versions, relevant source citations and token limits before model input.
    solves:
      Prevents the model receiving unrelated, stale or forbidden business context.
    gate:
      A revoked or superseded object is absent from new context packets, including cached retrieval paths.
  - id:
      H02
    part:
      Run and step controller
    reuse:
      Hermes bounded turn/tool-loop patterns.
    build:
      Stable run/step IDs, cancellation, execution budgets and explicit handoff to durable workflows.
    solves:
      Stops unbounded reasoning loops and makes interrupted work diagnosable.
    gate:
      Cancel between proposal and dispatch; no new side effect starts after cancellation is accepted.
  - id:
      H03
    part:
      Tool registry and schemas
    reuse:
      Selected upstream tool implementations through our adapter contract.
    build:
      Versioned input/output schemas, read/write classification, required grants and idempotency policy.
    solves:
      Turns model suggestions into a constrained interface instead of arbitrary commands.
    gate:
      Unknown tools, extra fields and invalid business object references are rejected.
  - id:
      H04
    part:
      Policy and decision boundary
    reuse:
      Identity-provider primitives; no researched agent replaces domain policy.
    build:
      Current principal/resource checks, exact-payload approval and asynchronous review queue.
    solves:
      Separates intent, authorization and actual execution.
    gate:
      Changed recipient, payload or object version invalidates an approval when its scope no longer matches.
  - id:
      H05
    part:
      Model and modality gateway
    reuse:
      Hermes-style provider/media dispatch; Docling as an independent parser.
    build:
      Capability profiles, redaction/data-region rules, request budgets, fallbacks and model-version recording.
    solves:
      Keeps model choice replaceable while acknowledging different capabilities and costs.
    gate:
      Fallback preserves data policy and output contract; unsupported modality returns an explicit limit.
  - id:
      H06
    part:
      Evidence and result validators
    reuse:
      Schema-validation libraries and deterministic test tooling.
    build:
      Citation resolution, unit/date checks, record-version checks and business invariants; human decisions where rules cannot settle ambiguity.
    solves:
      Prevents syntactically valid but unsupported output becoming business truth.
    gate:
      Fluent wrong quantities, wrong matters and non-existent citations fail acceptance.
  - id:
      H07
    part:
      Checkpoint and action reconciliation
    reuse:
      Persisted-intent ideas from Hermes; durable progression from the chosen workflow engine.
    build:
      Intent/attempt/receipt state, transactional outbox and provider-state reconciliation.
    solves:
      Distinguishes a failed action from an action that may have succeeded before a crash.
    gate:
      Crash after remote success yields reconciliation, not an automatic duplicate write.
  - id:
      H08
    part:
      Skills and workflow-pack governance
    reuse:
      Curated skills distribution patterns, not arbitrary runtime installation.
    build:
      Pinned pack/schema versions, allowed tools, ownership, staged rollout and rollback.
    solves:
      Makes restaurant and legal behavior explicit and independently testable.
    gate:
      An unreviewed skill cannot expand the worker’s authority or alter a released workflow silently.
  - id:
      H09
    part:
      Telemetry and independent evaluation
    reuse:
      Langfuse for permitted observability; focused security review procedures.
    build:
      Correlation IDs, redacted traces, authoritative outcome fixtures and release reports.
    solves:
      Explains failures and prevents the acting model from being the sole judge of success.
    gate:
      The same run can be followed from source to accepted state and receipt without exposing unnecessary raw content.
contracts:
  - id:
      C01
    name:
      Source observation
    fields:
      - tenant_id
      - business_id
      - connection_id
      - source_event_id
      - source_revision
      - source_kind
      - actor_ref
      - event_time
      - observed_at
      - ingested_at
      - cursor
      - media_refs
      - payload_hash
      - deletion_state
    rule:
      Uniqueness includes the provider connection and stable event identity. Re-delivery does not create a new fact; edits and deletions remain traceable revisions. Commit durably before advancing the checkpoint.
  - id:
      C02
    name:
      Evidence asset / derivative
    fields:
      - asset_id
      - tenant_id
      - object_key
      - content_hash
      - mime_type
      - source_ref
      - parent_asset_id
      - processor_version
      - page_or_time_range
      - coverage
      - access_policy
      - retention_class
    rule:
      Originals stay immutable. OCR, transcripts, sampled frames, thumbnails and redactions are derived objects with provenance. Signed access is short lived and scoped.
  - id:
      C03
    name:
      Candidate and admission decision
    fields:
      - candidate_id
      - workflow_pack_version
      - proposed_object_type
      - proposed_fields
      - evidence_refs
      - uncertainties
      - matcher_version
      - decision_id
      - reviewer_or_rule
      - policy_version
      - expected_record_version
    rule:
      A candidate is not an accepted record. Admission requires a permitted human or a preconfigured bounded rule; conflicting versions return for review.
  - id:
      C04
    name:
      Business record revision
    fields:
      - record_id
      - tenant_id
      - business_id
      - matter_id_optional
      - record_type
      - revision
      - supersedes
      - effective_at
      - recorded_at
      - accepted_by
      - decision_id
      - typed_values
      - evidence_refs
    rule:
      Keep operational event time separate from recording time. Corrections append revisions, recompute affected views and trace dependent tasks/exports; they do not erase history.
  - id:
      C05
    name:
      Grant and delegation
    fields:
      - grant_id
      - principal_id
      - tenant_id
      - resource_scope
      - allowed_action
      - constraints
      - valid_from
      - expires_at
      - revoked_at
      - policy_version
    rule:
      Source membership is not a grant. Re-evaluate at retrieval and dispatch. Approval binds the exact action payload, destination and object version; materially changed proposals need renewed approval.
  - id:
      C06
    name:
      Action intent and receipt
    fields:
      - action_id
      - workflow_id
      - causation_id
      - tenant_id
      - business_id
      - tool_version
      - payload_hash
      - idempotency_key
      - approval_ref
      - status
      - attempt_id
      - provider_object_ref
      - verification_evidence
      - error_class
    rule:
      Use prepared → authorized → dispatched → verified/failed/unknown. Unknown is reconciled by provider state or human decision before retrying a potentially completed side effect.
  - id:
      C07
    name:
      Task / matter / schedule
    fields:
      - task_id
      - matter_id_optional
      - assignee_id
      - accepted_record_ref
      - assignment_version
      - status
      - due_at
      - timezone
      - deadline_source
      - acknowledged_at
      - escalation_policy
      - calendar_projection_ref
    rule:
      Calendar and external task apps are projections of accepted SupaBiz state. A proposed hearing date is distinct from a validated date. Reassignment and corrections cancel or revise dependent reminders.
  - id:
      C08
    name:
      Workflow and outbox
    fields:
      - workflow_id
      - workflow_type
      - definition_version
      - business_object_ref
      - trigger_event_id
      - current_state
      - pending_decision_id
      - timer_ref
      - outbox_event_id
      - lease_owner
      - lease_expires_at
      - attempt_count
    rule:
      Commit business changes and their outbox entry in one database transaction. A relay starts/signals the workflow with stable IDs. The engine owns progression; the ledger owns accepted business facts.
  - id:
      C09
    name:
      Run / evaluation record
    fields:
      - run_id
      - trace_id
      - model_and_parameters
      - prompt_version
      - parser_version
      - policy_version
      - workflow_version
      - fixture_id_optional
      - input_refs
      - outcome_refs
      - review_minutes
      - usage_cost
      - latency
      - redaction_profile
    rule:
      Trace payloads are minimized and redacted. A release report distinguishes known tests, held-out tests, fault tests and real-pilot observations. Model scores are not authoritative business labels.
workflows:
  - id:
      W01
    name:
      Restaurant photo → reviewed issue → verified closure
    actor:
      Staff, manager and Varun; Consu or ForeFathers remains an explicit business scope.
    outcome:
      A specific operational issue becomes an assigned, acknowledged task with evidence of closure.
    steps:
      - name:
          Capture photo and message
        layers:
          - L02
          - L03
        output:
          C01/C02 preserve the source, sender, selected business and attachment. An offline connector shows its last complete checkpoint.
      - name:
          Propose the issue
        layers:
          - L04
          - L06
        output:
          Vision extracts visible observations and a candidate category/location. It cannot infer hidden conditions, compliance or when an unverified image was taken.
      - name:
          Manager accepts or corrects
        layers:
          - L01
          - L02
          - L05
        output:
          C03 accepts issue, location, severity and ownership; a duplicate can link to an existing issue without deleting source evidence.
      - name:
          Assign and await acknowledgement
        layers:
          - L07
          - L08
        output:
          C07 task plus C06 notification receipt; no acknowledgement within the configured interval escalates to the manager.
      - name:
          Close with evidence
        layers:
          - L04
          - L05
          - L07
        output:
          Staff attach completion evidence; the configured reviewer confirms closure. A new photo alone does not automatically prove the original issue is resolved.
      - name:
          Owner brief
        layers:
          - L01
          - L06
          - L10
        output:
          Show open, overdue, awaiting-review and closed issues with source links, capture freshness and notification outcomes.
    failure_cases:
      - Reused/forwarded photo → flag uncertain capture time.
      - Same image in two groups → dedupe only with explicit business/event context.
      - Task send times out → reconcile its action receipt.
      - Manager changes business/location → cancel the old proposal and revalidate scope.
    acceptance:
      - All reviewed fixtures create the expected issue/task state.
      - Zero unauthorized business crossings in the release fixture set.
      - Escalation and closure survive a worker restart.
    refinement:
      Make this the first narrow pilot candidate: it exercises media, review, tasks, reminders and receipts without treating an uncertain image as an accounting entry.
  - id:
      W02
    name:
      Delivery and invoice → reconciled inventory
    actor:
      Receiving staff, restaurant manager and accountant.
    outcome:
      A reviewed goods movement updates stock with known units and links to its invoice; accounting export remains a separate approved step.
    steps:
      - name:
          Capture delivery evidence
        layers:
          - L03
          - L04
        output:
          Invoice PDF/photo, voice note and messages retain independent source IDs even when they describe the same delivery.
      - name:
          Extract and match
        layers:
          - L04
          - L06
        output:
          Docling/OCR and optional transcription propose supplier, item, quantity, unit, date and delivery reference. Missing/ambiguous fields enter review.
      - name:
          Reconcile delivery and invoice
        layers:
          - L01
          - L05
        output:
          Manager resolves mismatched quantities, pack-to-unit conversion and duplicate candidates. A fuzzy match never silently merges two deliveries.
      - name:
          Post one accepted movement
        layers:
          - L05
          - L08
        output:
          One transaction admits a typed inventory movement and emits an outbox event. Deterministic calculations update stock; the model does not calculate the balance.
      - name:
          Handle corrections and follow-up
        layers:
          - L05
          - L07
        output:
          A corrected quantity supersedes the prior revision, recalculates the view and updates dependent low-stock tasks. Physical returns are separate movements.
      - name:
          Export for accountant
        layers:
          - L02
          - L08
          - L10
        output:
          Approved period export includes revisions, units, evidence and missing items. Operational stock changes do not automatically create tax/bookkeeping treatment.
    failure_cases:
      - Same delivery arrives by Gmail and WhatsApp → proposed linkage, not automatic deletion.
      - Invoice amount and received quantity differ → separate commercial and physical facts.
      - Late correction after export → adjustment/versioned export, never silent replacement.
      - Unknown unit → no stock posting until resolved.
    acceptance:
      - Expected balances match reviewed fixtures after replay and corrections.
      - Reprocessing produces no duplicate accepted movement.
      - Every accepted quantity and date resolves to evidence and a decision.
    refinement:
      Keep inventory admission separate from the first photo pilot. Add it after stable intake and task recovery; inventory and accounting require different validators and owners.
  - id:
      W03
    name:
      Court email → matched matter → verified assignment
    actor:
      Arkaj’s mailbox, Ramya, authorized principals and assigned support staff.
    outcome:
      A verified update reaches the right matter and assignee, with controlled documents and a traceable schedule.
    steps:
      - name:
          Receive and preserve
        layers:
          - L02
          - L03
        output:
          Scoped Gmail capture stores message and attachment identity. An email sender/name alone does not establish that a document is an authoritative court update.
      - name:
          Parse and identify
        layers:
          - L04
          - L06
        output:
          Docling extracts matter/case identifier, document date and proposed hearing information with page citations. Exact identifiers guide matching; ambiguous/new matters enter Ramya’s queue.
      - name:
          Verify the change
        layers:
          - L01
          - L02
          - L05
        output:
          Ramya checks source authenticity, matter match and date. Accepted updates cite evidence. No deadline is inferred from legal rules by this architecture.
      - name:
          Assign scoped work
        layers:
          - L05
          - L07
        output:
          Select assignee and work type using workload/role constraints. C07 records assignment version and acknowledgement requirement.
      - name:
          Share and schedule
        layers:
          - L02
          - L08
        output:
          Grant access to required matter files, create/update the approved calendar projection and record separate receipts for access, notification and calendar operations.
      - name:
          Follow through and correct
        layers:
          - L07
          - L05
          - L01
        output:
          Unacknowledged work escalates. Superseding hearing updates revise affected tasks/reminders after review; prior dates remain in history. Completion and next action are visible.
    failure_cases:
      - Same matter number in different courts/years → use compound identity and review ambiguity.
      - Two conflicting date updates → hold schedule change for review.
      - Forwarded duplicate or missing PDF → record evidence gap.
      - Assignee removed while action waits → revoke access and recheck before send.
      - Calendar write succeeds but response is lost → reconcile provider event ID.
    acceptance:
      - No schedule write before the required verification decision.
      - No document visible to an unassigned/unauthorized person in the test set.
      - One corrected accepted date propagates to the intended projections without duplicate events.
    refinement:
      Run as a shadow-mode validation workflow after restaurant recovery gates. Expand autonomy for routine routing only after evidence; retain human verification for matter identity and schedule-critical changes.
  - id:
      W04
    name:
      Daily accounting handoff → exceptions → acknowledged packet
    actor:
      Managers and CA for each authorized business.
    outcome:
      A clear daily handoff shows accepted totals, missing evidence and unresolved questions.
    steps:
      - name:
          Close a reporting window
        layers:
          - L05
          - L07
        output:
          Use a declared business-day cutoff and timezone; the packet records an as-of time and source completeness.
      - name:
          Build a deterministic packet
        layers:
          - L05
          - L08
        output:
          Export accepted movements/receipts plus unresolved exceptions. Model summaries explain the computed packet; they do not create totals.
      - name:
          Review and deliver
        layers:
          - L01
          - L02
          - L08
        output:
          Manager checks destination and disclosure scope. Send or grant access only to the authorized accountant and record the delivery outcome.
      - name:
          Acknowledge and follow up
        layers:
          - L07
          - L01
        output:
          Track CA questions as object-linked tasks. Later corrections create a revised packet/adjustment with a visible relationship to the prior version.
    failure_cases:
      - Disconnected source → packet marked incomplete.
      - CA supports both businesses → separate authorized scopes and labelled totals.
      - Uncertain delivery → visible status and reconciliation.
    acceptance:
      - Totals equal accepted ledger state at the stated cutoff.
      - Every missing item remains visible; “no data” is not reported as zero.
      - Acknowledgement/follow-up survives restarts.
    refinement:
      Treat the export as an operational handoff. A bookkeeping/accounting system integration can be added through the typed action boundary when requirements are known.
  - id:
      W05
    name:
      Owner voice request → scoped answer or approved action
    actor:
      Varun across two businesses, or a principal within permitted matters.
    outcome:
      The owner receives a sourced answer or an explicit action preview with an accountable outcome.
    steps:
      - name:
          Capture intent
        layers:
          - L01
          - L04
        output:
          Transcribe voice with an editable transcript. Clarify ambiguous business, person, quantity or time before dispatch.
      - name:
          Resolve authorized scope
        layers:
          - L02
          - L05
        output:
          Build separate authorized views for requested businesses/matters. Combine results only when permitted and label each contribution.
      - name:
          Answer or propose
        layers:
          - L06
          - L01
        output:
          Answer from accepted state with freshness/citations; if an action is requested, render destination, payload, consequences and required approval.
      - name:
          Execute and report
        layers:
          - L07
          - L08
        output:
          Recheck grants and payload/version, execute through a typed adapter, verify result and show receipt or unknown/failed status.
    failure_cases:
      - Wrong transcription changes a number → action preview catches it.
      - “Send this to everyone” → resolve explicit authorized recipients.
      - Access revoked after preview → dispatch denied.
      - Stale inventory view → answer includes freshness and pending corrections.
    acceptance:
      - Approved payload equals executed payload.
      - Unsupported certainty is rejected or qualified.
      - No hidden cross-business content enters the prompt.
    refinement:
      Launch voice notes/transcription before live real-time voice. Native chat should attach to accepted objects and reuse this action path; agent-to-agent exchange comes later with explicit delegated grants.
  - id:
      W06
    name:
      Shift or leave message → coverage decision → staff update
    actor:
      Staff member and authorized manager within one business.
    outcome:
      A requested schedule change becomes an explicit manager decision, with acknowledged coverage and a traceable roster revision.
    steps:
      - name:
          Capture the request
        layers:
          - L03
          - L04
        output:
          Preserve message/voice note, sender, requested date and business. A message saying “starting now” is a reported event, not independently verified attendance.
      - name:
          Resolve person and schedule
        layers:
          - L02
          - L05
          - L06
        output:
          Match the staff identity and current roster; unclear dates, reused phone numbers or incomplete requests enter review.
      - name:
          Manager decides
        layers:
          - L01
          - L02
          - L05
        output:
          Present requested change and coverage conflicts. Manager accepts/rejects or requests clarification; no automated disciplinary, payroll or employment decision.
      - name:
          Coordinate coverage
        layers:
          - L07
          - L08
        output:
          Propose a replacement only within approved eligibility rules, obtain acknowledgement, and then update the accepted roster/calendar projection.
      - name:
          Notify and reconcile
        layers:
          - L08
          - L05
        output:
          Send only needed schedule information to authorized recipients. A later correction updates the roster version and cancels obsolete reminders.
    failure_cases:
      - Leave approval without replacement acknowledgement → visible uncovered shift.
      - Personal leave reason → restricted record, not broadcast to the operations group.
      - Two managers edit the same shift → version conflict and review.
    acceptance:
      - Accepted roster matches manager-approved decisions and acknowledgements.
      - No private leave reason leaks through notifications or summaries.
      - Replayed request does not create duplicate shifts or reminders.
    refinement:
      Reuse the task, grant and workflow foundations; add a roster-specific state model and human decisions. Treat this as a demand-led expansion after the initial pilot, not a payroll product.
  - id:
      W07
    name:
      Customer review → investigated issue → approved response
    actor:
      Restaurant manager, responsible staff and authorized customer-contact owner.
    outcome:
      A complaint or review becomes a traceable operational follow-up; any external response is explicitly authorized.
    steps:
      - name:
          Capture feedback
        layers:
          - L03
          - L04
        output:
          Preserve review/message, source and business. Separate the customer’s allegation from facts confirmed by staff or evidence.
      - name:
          Triage and investigate
        layers:
          - L06
          - L01
          - L05
        output:
          Propose category/severity and link possible related issues. Manager checks duplicate reports, assigns investigation and restricts personal details.
      - name:
          Resolve the operational issue
        layers:
          - L07
          - L05
        output:
          Track acknowledgement, corrective action and evidence using the issue-task workflow. Completion is reviewed against the reported problem.
      - name:
          Draft and approve a response
        layers:
          - L01
          - L02
          - L08
        output:
          Present proposed wording, recipient/channel and any compensation commitment. Send only after the required business approval and record its outcome.
      - name:
          Owner trend view
        layers:
          - L05
          - L06
          - L10
        output:
          Report recurring accepted categories and unresolved complaints with denominators and sources; avoid treating a model sentiment label as a verified outcome.
    failure_cases:
      - Forwarded review with uncertain identity → do not contact an inferred person.
      - Response timeout → reconcile before sending another reply.
      - Draft promises refund/compensation → explicit authority required; payment execution is outside the initial workflow.
    acceptance:
      - Every sent response matches an authorized recipient and approved payload.
      - Allegations and verified operational facts remain distinguishable.
      - Issue closure and customer response are separate states.
    refinement:
      Use the same issue/task core as photos, with additional privacy and outbound-communication approval. Keep automatic public posting and compensation outside the initial pilot.
refinement_log:
  - id:
      R01
    initial:
      Install the strongest complete agent stack.
    refined:
      Keep the existing harness behind a contract; adapt Hermes seams and benchmark them.
    because:
      W01/W02 can fail on capture/admission even if the conversational agent is strong. A wholesale migration adds uncertainty without repairing those seams.
    workflows:
      - W01
      - W02
      - W05
  - id:
      R02
    initial:
      One workflow engine for every tool plus a separate automation suite.
    refined:
      One core durable workflow owner; optional connector flows stay subordinate.
    because:
      Two owners of timers, task states and retries make it unclear which system should recover an interrupted operation.
    workflows:
      - W01
      - W03
      - W04
  - id:
      R03
    initial:
      Take maximum permissions at setup.
    refined:
      Use scoped enrollment and incremental permission requests tied to enabled workflows.
    because:
      An accountant group, operations group and legal matter have different audiences even when the same owner participates.
    workflows:
      - W03
      - W04
      - W05
  - id:
      R04
    initial:
      Photo understanding immediately changes business state.
    refined:
      Begin with reviewed issue/task creation; separate inventory and accounting admission.
    because:
      A visual observation is different from a verified quantity movement or accepted financial entry.
    workflows:
      - W01
      - W02
  - id:
      R05
    initial:
      Extract a date and schedule it.
    refined:
      Verify source, matter identity and date before any schedule-critical write.
    because:
      A parser can read a date correctly yet associate it with the wrong matter or document purpose.
    workflows:
      - W03
  - id:
      R06
    initial:
      Retry failures until they succeed.
    refined:
      Distinguish failed from unknown, then reconcile before retrying external writes.
    because:
      The remote operation may have succeeded before its response was lost.
    workflows:
      - W01
      - W02
      - W03
      - W04
      - W05
  - id:
      R07
    initial:
      Add browser, images, voice and long video together.
    refined:
      Images/PDFs and voice notes first; scoped browser and short video after evidence and cost gates.
    because:
      Each modality adds different coverage gaps; workflow benefit must justify its review cost.
    workflows:
      - W01
      - W02
      - W03
      - W05
  - id:
      R08
    initial:
      Agent memory keeps everything we know.
    refined:
      Accepted facts live in the ledger; runtime memory and search indexes are derived and revocable.
    because:
      Corrections, permissions and exports must work across models and runtime replacements.
    workflows:
      - W02
      - W03
      - W05
  - id:
      R09
    initial:
      All staff messages can be treated as generic tasks.
    refined:
      Give schedule requests a roster model, coverage acknowledgement and restricted personal details.
    because:
      A leave request, a report of attendance and an approved shift change are different states.
    workflows:
      - W06
  - id:
      R10
    initial:
      Resolving an internal issue also completes the customer workflow.
    refined:
      Track investigation, operational closure and approved external response separately.
    because:
      A corrected kitchen issue does not mean a customer was contacted, and a draft response is not permission to send.
    workflows:
      - W07
roadmap:
  - id:
      S0
    name:
      Baseline and contracts
    depends:

    deliver:
      - Audit actual SupaBiz code and replay prior known/fresh-intake failures.
      - Freeze source envelope, admission, grant and action contracts; inventory dependency licenses and versions.
      - Create reviewed fixtures for the seven workflows and permission boundaries.
    exit:
      A fresh event is traceable from source to candidate; each current failure is reproducible and assigned to a layer.
    avoid:
      Do not migrate the agent runtime or claim production readiness.
  - id:
      S1
    name:
      Reliable intake and protected evidence
    depends:
      - S0
    deliver:
      - Durable WhatsApp/Gmail journal and checkpoints with visible gaps.
      - Tenant/matter identity, secrets, original media store and Docling/image/transcription spike.
      - Dedupe, edits, cursor expiry, outage and device revocation tests.
    exit:
      Replay/crash tests preserve source identities and expected evidence; unauthorized reads are denied.
    avoid:
      No autonomous posting from raw model extraction.
  - id:
      S2
    name:
      Photo issue workflow in the app
    depends:
      - S1
    deliver:
      - W01 review, assignment, acknowledgement, escalation and closure UI.
      - Typed actions/receipts and a bounded Temporal-versus-current-worker recovery spike.
      - Minimal redacted traces and deterministic acceptance tests.
    exit:
      A fresh photo completes the full operational loop, including restart and uncertain-send recovery. Choose the workflow engine before pilot expansion.
    avoid:
      Do not add a full ERP, native messenger or multiple agent harnesses.
  - id:
      S3
    name:
      Inventory and daily handoff
    depends:
      - S2
    deliver:
      - W02 units, evidence matching, revision ledger and deterministic balances.
      - W04 period packet, exceptions, authorized delivery and acknowledgements.
      - At least two business scopes in tests, plus corrections after export.
    exit:
      Reviewed balances and packet totals match expected results after duplicate, late and corrected events.
    avoid:
      Do not automate accounting treatment from inventory messages.
  - id:
      S4
    name:
      Legal workflow in shadow mode
    depends:
      - S2
    deliver:
      - W03 compound matter identity and review queue.
      - Verified schedule proposals, scoped attachments and assignment tracking.
      - Compare proposed decisions to Ramya-reviewed fixtures before limited live use.
    exit:
      No unreviewed schedule-critical writes; correct matter/file access and correction propagation on held-out scenarios.
    avoid:
      No inferred legal deadlines or automatic client disclosure.
  - id:
      S5
    name:
      Measured pilot and recovery
    depends:
      - S2
    deliver:
      - Pilot only workflows whose own gates passed: W01 after S2, inventory after S3 and legal after S4. Run W05 owner requests; measure review time, verified completion, latency and cost per workflow.
      - Restore test, provider outage, cross-tenant isolation and revocation checks.
      - Scoped browser pilot only for a documented API gap; short-video trial only for a validated operational need.
      - Demand-led extensions: W06 shift/leave coverage and W07 customer feedback; reuse the core but add their distinct state and disclosure rules.
    exit:
      Publish sample counts, critical failures, unknown outcomes and cost; pilot owner signs off the measured acceptance criteria.
    avoid:
      No guaranteed percentage gains based on repository claims.
  - id:
      S6
    name:
      Native collaboration and expansion
    depends:
      - S5
    deliver:
      - Object-linked app chat, notification preferences and device handoff.
      - New connector packs only behind existing contracts.
      - Delegated agent exchange only after identity, consent, replay and revocation semantics are specified.
    exit:
      Native collaboration improves a measured existing workflow and preserves the same evidence/grant/receipt boundaries.
    avoid:
      Do not force a WhatsApp migration before the replacement provides clear value.
measurement_plan:
  - name:
      Verified workflow completion
    definition:
      Cases ending in the expected accepted business state and verified external effects / eligible submitted cases; report blocked, failed and unknown separately.
    baseline:
      Not established end-to-end. Prior fresh-answer test was 0/3 strict-clean, a different measure.
    gate:
      Proposed release gate: every critical held-out fixture passes; pilot target is set after baseline, not invented here.
  - name:
      Capture completeness
    definition:
      Expected test source events durably represented / events emitted by a controlled fixture, with media availability and gap flags.
    baseline:
      Founder-reported connectivity only.
    gate:
      All controlled replay/disconnect fixtures accounted for; real-provider completeness limits explicitly displayed.
  - name:
      Unauthorized effects / leakage
    definition:
      Cross-scope reads, disclosures or writes in adversarial and revocation fixtures.
    baseline:
      Not independently measured.
    gate:
      Zero accepted violations in the release test set; not a claim of zero possible vulnerabilities.
  - name:
      Duplicate effects
    definition:
      Extra inventory movements, tasks, messages or calendar objects after replay, timeout and restart.
    baseline:
      No production baseline.
    gate:
      Zero unexpected effects in the defined fault fixtures; unresolved provider outcomes remain unknown.
  - name:
      Human review burden
    definition:
      Median and p90 operator review minutes per eligible workflow plus correction rate, measured against a comparable manual baseline.
    baseline:
      Collect during shadow operation.
    gate:
      Agree a workload-specific reduction after measurement; do not trade away critical validation to reduce review time.
  - name:
      Cost and latency
    definition:
      Provider/model/media/worker cost per verified completion; p50/p95 time to candidate, decision and verified finish, with human waiting separated.
    baseline:
      Prior two-answer cost/timing is too small and different to predict pilot economics.
    gate:
      Set workflow budgets and escalation behavior before live autonomy; report failed/unknown run cost too.
research_dossiers:
  - id:
      P01-hermes
    name:
      Hermes Agent
    category:
      Personal agent runtime
    sections:
      What it is:
        Hermes combines a conversational agent loop, model access, tools, channel adapters, persistent memory, skills and scheduled work. It is a working personal-agent application rather than only an SDK or a collection of prompts. Its security documentation describes a single-tenant personal-agent trust model. A messaging adapter accepting more than one authorized person does not establish independent enterprise roles or isolated business tenants.
      Runtime and tool flow:
        A channel receives a message and resolves the authorized session. The agent composes its context, requests a model response and processes proposed tools. The selected turn-validation and turn-round modules validate tool calls and persist a tool-intent receipt before execution; failure to flush that receipt can stop execution. Tool results feed subsequent turns. These controls help reconstruct an interrupted turn, but they do not make every external operation transactional or exactly-once. A write to a remote application can succeed before its confirmation is safely recorded.
      Memory and extension:
        Built-in memory uses MEMORY.md and USER.md, with a session snapshot included in the prompt. Updating those files persists information without necessarily rebuilding the current session's frozen prompt. The context engine provides separate assembly and provider-extension mechanisms. Skills are reusable procedures; selected skill-manager guards require context for mutation and support review. A skill's instructions and a platform's enforced access policy are different things. A complete extension review needs the tool implementation, its schema, its credential access and its filesystem/network effects.
      Browser, vision, voice and video:
        The browser tool supports browser automation through agent-browser, accessible snapshots and element references, with local/remote browser connection options. Screenshots can be interpreted by a model rather than being treated as readable page text. The vision tool's video path materializes video bytes and sends encoded content to a compatible auxiliary model; the inspected path is opt-in and imposes an encoded size limit. It is not itself a universal local frame-analysis pipeline. Transcription dispatches to configured local or cloud backends. These modalities are separate tool/data paths, not proof that the main model directly perceives every file or video format.
      Channel and scheduling persistence:
        The inspected WhatsApp bridge uses Baileys and an in-memory queue capped at 100 entries. Overflow removes an older item, and the messages endpoint removes queued messages before the downstream Python consumer has demonstrated durable processing. Full-history sync is disabled in this path. These are potential loss windows established by code inspection, not measured loss rates. Scheduled work separately uses occurrence identifiers and a delivery queue; an interrupted claimed send can be classified as unknown instead of automatically resent. That distinction addresses uncertainty about an external send rather than pretending every restart is safe to retry.
      Authority and operating environment:
        Model-provider credentials, channel sessions, local files and tools are separate sources of authority. The security document treats authorized callers within the personal-agent deployment as trusted. A terminal sandbox alone does not constrain every other in-process tool; process/container permissions and network boundaries matter as well. Root code is MIT at this revision. Dependencies, model services and browser providers have their own operational requirements. No accounts were connected and no Hermes runtime or WhatsApp bridge was launched in this investigation.
      Experiments needed next:
        Exercise a tool-intent persistence failure, restart after an external side effect, bridge overflow and a consumer crash after dequeue. Check how memory changes become visible in the current versus next session. Test browser state loss, a video above the encoded limit, unsupported audio, and a scheduled send whose response is lost. Those experiments would establish behavior under failure; the source alone cannot supply latency, reliability or cost percentages.
    findings:
      - id:
          P01-hermes:HE-01
        project_id:
          P01-hermes
        evidence_kind:
          Code
        claim:
          Tool execution has a persisted-intent boundary.
        source:
          repository_id:
            P01-hermes
          repository:
            NousResearch/hermes-agent
          revision:
            848fc0ad8be766b9dc10fe42bd80b5fc2d45d95c
          path:
            agent/turn_tool_round.py
          sha256:
            1ccd3574528597f5c3a5589729849f8a10e422f0d970af3bb03b1fbd277f1f29
          url:
            https://github.com/NousResearch/hermes-agent/blob/848fc0ad8be766b9dc10fe42bd80b5fc2d45d95c/agent/turn_tool_round.py
          local_snapshot_retained_not_published:
            True
        runtime_verified:
          False
      - id:
          P01-hermes:HE-02
        project_id:
          P01-hermes
        evidence_kind:
          Code
        claim:
          Context assembly is an explicit subsystem.
        source:
          repository_id:
            P01-hermes
          repository:
            NousResearch/hermes-agent
          revision:
            848fc0ad8be766b9dc10fe42bd80b5fc2d45d95c
          path:
            agent/context_engine.py
          sha256:
            516a4961c59af4c1048dc523b83f135b1fd0089423775fbe3fc04ffdcdb45cbb
          url:
            https://github.com/NousResearch/hermes-agent/blob/848fc0ad8be766b9dc10fe42bd80b5fc2d45d95c/agent/context_engine.py
          local_snapshot_retained_not_published:
            True
        runtime_verified:
          False
      - id:
          P01-hermes:HE-03
        project_id:
          P01-hermes
        evidence_kind:
          Code
        claim:
          WhatsApp bridge has a bounded, destructive-read in-memory queue.
        source:
          repository_id:
            P01-hermes
          repository:
            NousResearch/hermes-agent
          revision:
            848fc0ad8be766b9dc10fe42bd80b5fc2d45d95c
          path:
            scripts/whatsapp-bridge/bridge.js
          sha256:
            607a82525c938bd9c97f687239e32cd024d426ef65e0ffd1f8c46dcb382ace9f
          url:
            https://github.com/NousResearch/hermes-agent/blob/848fc0ad8be766b9dc10fe42bd80b5fc2d45d95c/scripts/whatsapp-bridge/bridge.js
          local_snapshot_retained_not_published:
            True
        runtime_verified:
          False
      - id:
          P01-hermes:HE-04
        project_id:
          P01-hermes
        evidence_kind:
          Code
        claim:
          Video analysis uses an auxiliary vision-tool path.
        source:
          repository_id:
            P01-hermes
          repository:
            NousResearch/hermes-agent
          revision:
            848fc0ad8be766b9dc10fe42bd80b5fc2d45d95c
          path:
            tools/vision_tools.py
          sha256:
            3f12fda1e3b8d8154cb6e831299ac19a47431aca2c6bc43e84a3c2a078c78bc2
          url:
            https://github.com/NousResearch/hermes-agent/blob/848fc0ad8be766b9dc10fe42bd80b5fc2d45d95c/tools/vision_tools.py
          local_snapshot_retained_not_published:
            True
        runtime_verified:
          False
      - id:
          P01-hermes:HE-05
        project_id:
          P01-hermes
        evidence_kind:
          Documentation
        claim:
          Security scope is a single-tenant personal agent.
        source:
          repository_id:
            P01-hermes
          repository:
            NousResearch/hermes-agent
          revision:
            848fc0ad8be766b9dc10fe42bd80b5fc2d45d95c
          path:
            SECURITY.md
          sha256:
            08b733d1f2c71f8cdd87200beb10c06185d0912a6eb19bbf69149dbb4e207a55
          url:
            https://github.com/NousResearch/hermes-agent/blob/848fc0ad8be766b9dc10fe42bd80b5fc2d45d95c/SECURITY.md
          local_snapshot_retained_not_published:
            True
        runtime_verified:
          False
      - id:
          P01-hermes:HE-06
        project_id:
          P01-hermes
        evidence_kind:
          Code
        claim:
          Delivery queue distinguishes uncertain interrupted sends.
        source:
          repository_id:
            P01-hermes
          repository:
            NousResearch/hermes-agent
          revision:
            848fc0ad8be766b9dc10fe42bd80b5fc2d45d95c
          path:
            cron/delivery_queue.py
          sha256:
            6cf591b7cacff379de5d585fce85c4909bef892037b605ca9d2bbb6a3a86c5c7
          url:
            https://github.com/NousResearch/hermes-agent/blob/848fc0ad8be766b9dc10fe42bd80b5fc2d45d95c/cron/delivery_queue.py
          local_snapshot_retained_not_published:
            True
        runtime_verified:
          False
    unknowns:
      - No runtime or throughput measurement.
      - Selected files do not establish enterprise tenant isolation.
      - Channel delivery and media support require controlled end-to-end tests.
    related_projects:
      - P06-browser-use
      - P08-letta
      - P05-temporal
      - P15-rea
    repository:
      NousResearch/hermes-agent
    revision:
      848fc0ad8be766b9dc10fe42bd80b5fc2d45d95c
    url:
      https://github.com/NousResearch/hermes-agent
    source_file_count:
      15
    auxiliary_sources:

  - id:
      P02-activepieces
    name:
      Activepieces
    category:
      Automation platform
    sections:
      What it is:
        Activepieces combines a visual workflow builder, a catalogue of integration packages called pieces, a server API, and workers that execute jobs. A piece supplies triggers, actions and configuration rather than being a complete workflow by itself. The builder connects these capabilities into a versioned flow. This distinction matters when reading the repository: a reusable connector, the workflow engine, and the hosted product are different units with different dependencies.
      Architecture and boundaries:
        The selected Compose file separates APP and WORKER containers and supplies PostgreSQL and Redis. The API-side job broker owns BullMQ workers and dispatches jobs to execution workers; the execution worker selects a handler from a job-type registry. That registry covers flows, polling, webhooks, token refresh, validation, property resolution and single actions. AI and agent handlers are lazy-loaded. This means ordinary flow execution need not eagerly load the AI dependency graph. The public README's broad product claims should be read separately from this directly inspected execution machinery.
      Main execution flow:
        A trigger or API request results in a typed job. The broker dequeues it, migrates and validates its schema, applies interceptors, and assigns it to an execution worker. It records ownership so a disconnected worker's in-flight jobs can be returned to the queue. Jobs have locks and attempt counts, and workers can extend their locks. The result is completed or failed through the broker. A separate run-metadata queue takes reported progress, checks the project/run identity, writes flow-run state, and coordinates relevant waitpoint/resume effects. Retrying a job is not in itself evidence that an external side effect occurs exactly once.
      Data and persistence:
        PostgreSQL is the durable application database in the inspected deployment; Redis backs queues and coordination. Run-metadata handling takes a distributed lock and uses project-scoped keys. It checks for deleted flows and mismatched project ownership before updating records. The connection service stores encrypted values together with platform/project associations and exposes versions that omit sensitive values. Cache directories are mounted into both container roles. Backups would need to account for database state and operational queue state; recovery consistency was not exercised here.
      Authentication and trust:
        Connection retrieval includes a project-membership condition, then decrypts and refreshes the credential as needed. The inspected return path removes refresh tokens and client secrets. The response-serialization ownership guard rejects a project mismatch on supported payload shapes. That guard is one layer, not a complete audit of every request, role, worker, or nested payload. Code actions and integration packages create executable trust boundaries that require separate sandbox analysis. The presence of encryption calls establishes a code path, not that deployment keys are correctly configured or protected.
      Deployment and extension:
        The repository is a TypeScript monorepo; integration pieces are separately packaged. Extending it normally means defining an action/trigger and its typed inputs/authentication, or changing platform API/worker behavior for a deeper feature. The selected deployment pins an application image and creates multiple workers, so independently scaling execution is an intended operational shape. A complete deployment review must still trace environment variables, worker authentication, sandbox mode, migrations, resource limits and webhook exposure. We did not start its containers or install packages.
      Licensing and ownership:
        The root license distinguishes MIT-covered code from specified enterprise directories and third-party components. The README also distinguishes Community Edition and commercial enterprise features. Do not apply a single license label to all code selected for reuse. The exact feature, file path, dependency and edition need checking at the pinned revision. Repository visibility does not imply that a hosted feature is included in a chosen self-hosted edition.
      How to continue the investigation:
        Follow one actual piece from its trigger definition through enqueue, worker execution, pause/resume and final run persistence. Read the sandbox implementation and worker authentication path. Then run a controlled workflow with a stub external service, crash between the remote effect and completion acknowledgement, and check the resulting retry behavior. Separate connector correctness, workflow recovery and business-side idempotency in the result. These are proposed experiments, not results from this pass.
    findings:
      - id:
          P02-activepieces:AP-01
        project_id:
          P02-activepieces
        evidence_kind:
          Code
        claim:
          APP/WORKER roles and PostgreSQL/Redis services are explicit in deployment.
        source:
          repository_id:
            P02-activepieces
          repository:
            activepieces/activepieces
          revision:
            82300fe8029390e614f63eeac079ccc6db60eba6
          path:
            docker-compose.yml
          sha256:
            401fe3448ff16b2844e24ef0eebba7d8e5777c35e3e215ed0a7646b07807e0b2
          url:
            https://github.com/activepieces/activepieces/blob/82300fe8029390e614f63eeac079ccc6db60eba6/docker-compose.yml
          local_snapshot_retained_not_published:
            True
        runtime_verified:
          False
      - id:
          P02-activepieces:AP-02
        project_id:
          P02-activepieces
        evidence_kind:
          Code
        claim:
          Job dispatch includes schema validation, locks, retries and disconnected-worker reassignment.
        source:
          repository_id:
            P02-activepieces
          repository:
            activepieces/activepieces
          revision:
            82300fe8029390e614f63eeac079ccc6db60eba6
          path:
            packages/server/api/src/app/workers/job-queue/job-broker.ts
          sha256:
            6c493942493fb269ccb9f6c8bced790fdcdf38f3de52fdfada46152340ab53f7
          url:
            https://github.com/activepieces/activepieces/blob/82300fe8029390e614f63eeac079ccc6db60eba6/packages/server/api/src/app/workers/job-queue/job-broker.ts
          local_snapshot_retained_not_published:
            True
        runtime_verified:
          False
      - id:
          P02-activepieces:AP-03
        project_id:
          P02-activepieces
        evidence_kind:
          Code
        claim:
          Run metadata checks project/run ownership and persists progress separately.
        source:
          repository_id:
            P02-activepieces
          repository:
            activepieces/activepieces
          revision:
            82300fe8029390e614f63eeac079ccc6db60eba6
          path:
            packages/server/api/src/app/flows/flow-run/flow-runs-queue.ts
          sha256:
            0fe8f5b78dbf01f2c2d64df696baab87fffbb859e27b0c12243092fb6ac923a7
          url:
            https://github.com/activepieces/activepieces/blob/82300fe8029390e614f63eeac079ccc6db60eba6/packages/server/api/src/app/flows/flow-run/flow-runs-queue.ts
          local_snapshot_retained_not_published:
            True
        runtime_verified:
          False
      - id:
          P02-activepieces:AP-04
        project_id:
          P02-activepieces
        evidence_kind:
          Code
        claim:
          Connection values are encrypted; retrieval is scoped and can refresh credentials.
        source:
          repository_id:
            P02-activepieces
          repository:
            activepieces/activepieces
          revision:
            82300fe8029390e614f63eeac079ccc6db60eba6
          path:
            packages/server/api/src/app/app-connection/app-connection-service/app-connection-service.ts
          sha256:
            5815523f64fa7f7ef488830fd63f0b28a1e2a3fe10dcbe9f65f6a95db7303b93
          url:
            https://github.com/activepieces/activepieces/blob/82300fe8029390e614f63eeac079ccc6db60eba6/packages/server/api/src/app/app-connection/app-connection-service/app-connection-service.ts
          local_snapshot_retained_not_published:
            True
        runtime_verified:
          False
      - id:
          P02-activepieces:AP-05
        project_id:
          P02-activepieces
        evidence_kind:
          Code
        claim:
          Worker registry separates eager flow handlers from lazy AI/agent handlers.
        source:
          repository_id:
            P02-activepieces
          repository:
            activepieces/activepieces
          revision:
            82300fe8029390e614f63eeac079ccc6db60eba6
          path:
            packages/server/worker/src/lib/execute/job-registry.ts
          sha256:
            4ad660f0332b42034c0bae81771f74585c85a7c513441e8734c0d602e438829c
          url:
            https://github.com/activepieces/activepieces/blob/82300fe8029390e614f63eeac079ccc6db60eba6/packages/server/worker/src/lib/execute/job-registry.ts
          local_snapshot_retained_not_published:
            True
        runtime_verified:
          False
      - id:
          P02-activepieces:AP-06
        project_id:
          P02-activepieces
        evidence_kind:
          License
        claim:
          Root license contains enterprise-path and third-party exceptions.
        source:
          repository_id:
            P02-activepieces
          repository:
            activepieces/activepieces
          revision:
            82300fe8029390e614f63eeac079ccc6db60eba6
          path:
            LICENSE
          sha256:
            d490fc48488c4f5a721d354f0a5cce0972c7e3de768ac3e0c5851c3de79f3c9b
          url:
            https://github.com/activepieces/activepieces/blob/82300fe8029390e614f63eeac079ccc6db60eba6/LICENSE
          local_snapshot_retained_not_published:
            True
        runtime_verified:
          False
    unknowns:
      - End-to-end sandbox containment and credential exposure were not audited.
      - Edition-specific access controls and their complete enforcement remain unverified.
      - No workload, throughput, cost or recovery benchmark was run.
    related_projects:
      - P03-nango
      - P05-temporal
      - P12-zapier-mcp
    repository:
      activepieces/activepieces
    revision:
      82300fe8029390e614f63eeac079ccc6db60eba6
    url:
      https://github.com/activepieces/activepieces
    source_file_count:
      10
    auxiliary_sources:

  - id:
      P03-nango
    name:
      Nango
    category:
      Connection and integration infrastructure
    sections:
      What it is:
        Nango is a backend for connecting a product or agent to external APIs. Its abstractions include accounts, environments, integration configurations, end users, connections, connection sessions and execution jobs. It handles more than an OAuth login screen: the repository includes credential lifecycle, API access, sync execution, records and agent-facing MCP surfaces. A connection identifies an authorized relationship to a provider; it is not the same as an application user or an arbitrary permission to perform business actions.
      Architecture and main flow:
        A client obtains a connection session for selected integrations and an end user. The server validates referenced integrations and stores the session in a transaction. A completed provider authentication creates or updates a connection. Subsequent server operations resolve the environment and integration/connection identifiers before obtaining credentials or metadata. Scheduled or requested sync tasks enter a separate jobs path, start an integration script, carry heartbeat and execution limits, and finish through success/error handlers. The MCP agent-session server registers tools and delegates tool calls through a common execution wrapper. These are separate boundaries, not one prompt with every API credential attached.
      Data and credentials:
        The connection service contains transactional creation and update paths and tracks refresh success, failure, attempts and exhaustion. The encryption manager transforms credentials into an encrypted payload with IV and authentication tag when a key is configured. Crucially, its inspected shouldEncrypt check is conditional on a nonempty key; without one, encryptConnection returns the connection unchanged. This is a configuration boundary worth remembering, not evidence that the hosted service stores plaintext. The selected Compose file passes NANGO_ENCRYPTION_KEY and database settings explicitly and includes PostgreSQL and Redis.
      Authorization:
        The authorization middleware evaluates required scopes against a resolved principal and returns forbidden when none match. The public connection endpoint separately tests the read_credentials scope. Requesting refresh-token or forced-refresh operations without that capability is rejected, and the response can instead contain connection metadata without credentials. Environment scoping and credential access are therefore observable concepts in the source. Complete end-user isolation, all proxy destinations and every MCP grant remain outside this bounded inspection.
      Deployment and extension:
        The TypeScript monorepo separates server, shared services, jobs, runner SDK, records, persistence and other packages. Provider configuration and user-authored integration scripts are extension surfaces. A complete product deployment can involve more services than a minimal authentication-only setup. The Compose sample is a starting topology, not a hardened deployment proof; it contains example database credentials and exposed service ports. No sample secrets were connected to real systems here. Sync script isolation, outbound policy, migration and key-rotation behavior need their own traced tests.
      Licensing and source boundary:
        The collected root LICENSE is the controlling source document, with Elastic License 2.0 terms rather than a blanket MIT assumption. SDK/package terms should be checked individually. Publicly inspectable server code does not automatically imply unrestricted managed-service redistribution. This dossier records the license identity without making a legal determination about a proposed commercial use.
      Questions and experiments:
        The next source pass should follow one OAuth provider through state validation, callback, refresh lock, expiry, revocation and reconnect. A controlled provider stub should force simultaneous refresh requests, an expired refresh token, a lost webhook and a repeated sync page. Compare resulting connection and record state before making durability claims. The encryption configuration should be tested with valid, absent, rotated and incorrect keys. All of these remain experiments to perform, not observed outcomes.
    findings:
      - id:
          P03-nango:NA-01
        project_id:
          P03-nango
        evidence_kind:
          Code
        claim:
          Credential reads/refresh operations require an explicit scope in the inspected endpoint.
        source:
          repository_id:
            P03-nango
          repository:
            NangoHQ/nango
          revision:
            244fac3eb035f0d423aa16b4cc8563de7066f941
          path:
            packages/server/lib/controllers/connection/connectionId/getConnection.ts
          sha256:
            32105cbe06941e78c7874bccd7fd04d64769ae697166370e2a5c343fa1d68608
          url:
            https://github.com/NangoHQ/nango/blob/244fac3eb035f0d423aa16b4cc8563de7066f941/packages/server/lib/controllers/connection/connectionId/getConnection.ts
          local_snapshot_retained_not_published:
            True
        runtime_verified:
          False
      - id:
          P03-nango:NA-02
        project_id:
          P03-nango
        evidence_kind:
          Code
        claim:
          Connection encryption is conditional on a configured key.
        source:
          repository_id:
            P03-nango
          repository:
            NangoHQ/nango
          revision:
            244fac3eb035f0d423aa16b4cc8563de7066f941
          path:
            packages/shared/lib/utils/encryption.manager.ts
          sha256:
            15a7b5c5790958ef993fd8da5436d22cc02c1fbd9045c9eb958715322153e68c
          url:
            https://github.com/NangoHQ/nango/blob/244fac3eb035f0d423aa16b4cc8563de7066f941/packages/shared/lib/utils/encryption.manager.ts
          local_snapshot_retained_not_published:
            True
        runtime_verified:
          False
      - id:
          P03-nango:NA-03
        project_id:
          P03-nango
        evidence_kind:
          Code
        claim:
          Connect-session creation validates references and uses a transaction.
        source:
          repository_id:
            P03-nango
          repository:
            NangoHQ/nango
          revision:
            244fac3eb035f0d423aa16b4cc8563de7066f941
          path:
            packages/server/lib/services/connectSession.service.ts
          sha256:
            7e29e7aabac62f027356942b4d0c5c456a7510c262c1081d667a0b8895cbda25
          url:
            https://github.com/NangoHQ/nango/blob/244fac3eb035f0d423aa16b4cc8563de7066f941/packages/server/lib/services/connectSession.service.ts
          local_snapshot_retained_not_published:
            True
        runtime_verified:
          False
      - id:
          P03-nango:NA-04
        project_id:
          P03-nango
        evidence_kind:
          Code
        claim:
          Sync execution has start, success, error and abort paths.
        source:
          repository_id:
            P03-nango
          repository:
            NangoHQ/nango
          revision:
            244fac3eb035f0d423aa16b4cc8563de7066f941
          path:
            packages/jobs/lib/execution/sync.ts
          sha256:
            4824f32f878b0e5c5c76cfa74c035ab15cb1c4f671e97bf8c6a89cd1f8d20232
          url:
            https://github.com/NangoHQ/nango/blob/244fac3eb035f0d423aa16b4cc8563de7066f941/packages/jobs/lib/execution/sync.ts
          local_snapshot_retained_not_published:
            True
        runtime_verified:
          False
      - id:
          P03-nango:NA-05
        project_id:
          P03-nango
        evidence_kind:
          Code
        claim:
          Agent-session MCP tools are registered and wrapped centrally.
        source:
          repository_id:
            P03-nango
          repository:
            NangoHQ/nango
          revision:
            244fac3eb035f0d423aa16b4cc8563de7066f941
          path:
            packages/server/lib/controllers/agent/mcp/sessionServer.ts
          sha256:
            f581e3c4b434b4d4e82b4b9f733baf89fdcbf1b6c1e1df3c6f60333d2528d31a
          url:
            https://github.com/NangoHQ/nango/blob/244fac3eb035f0d423aa16b4cc8563de7066f941/packages/server/lib/controllers/agent/mcp/sessionServer.ts
          local_snapshot_retained_not_published:
            True
        runtime_verified:
          False
      - id:
          P03-nango:NA-06
        project_id:
          P03-nango
        evidence_kind:
          License
        claim:
          Root source license is Elastic License 2.0.
        source:
          repository_id:
            P03-nango
          repository:
            NangoHQ/nango
          revision:
            244fac3eb035f0d423aa16b4cc8563de7066f941
          path:
            LICENSE
          sha256:
            6dbe65007c1f2eb6c362834cc509bd958938a7be3fd15155f3a29c0c8d0a334a
          url:
            https://github.com/NangoHQ/nango/blob/244fac3eb035f0d423aa16b4cc8563de7066f941/LICENSE
          local_snapshot_retained_not_published:
            True
        runtime_verified:
          False
    unknowns:
      - No authentication callback or proxy security audit was completed.
      - Actual deployment encryption settings and hosted infrastructure are unknown.
      - No integration has been connected or exercised.
    related_projects:
      - P02-activepieces
      - P12-zapier-mcp
    repository:
      NangoHQ/nango
    revision:
      244fac3eb035f0d423aa16b4cc8563de7066f941
    url:
      https://github.com/NangoHQ/nango
    source_file_count:
      14
    auxiliary_sources:

  - id:
      P04-docling
    name:
      Docling
    category:
      Document parsing and conversion
    sections:
      What it is:
        Docling is a document-processing library. Its central operation converts an input document into a structured document result that can be exported or consumed by downstream applications. It handles document structure as well as text: page layout, reading order, tables and optional enrichments. Parsing a supplier invoice or a court document does not by itself establish the business meaning of a number or date. The output is a structured interpretation of the source, with processing status and errors.
      Architecture:
        DocumentConverter is the public entry point. Format-option classes associate formats with backends and pipelines. Its allowed_formats setting constrains accepted formats, and pipeline construction is cached using pipeline options. Backends supply format-specific access; pipelines build, assemble and optionally enrich a result. The standard PDF pipeline uses threaded stages and bounded queues around model-based processing. This separates decoding a source format from choosing OCR/layout/table models and from assembling a final document.
      Main execution flow:
        The converter accepts a source, identifies or checks its format, selects a configured backend and obtains the corresponding pipeline. BasePipeline.execute creates a ConversionResult, performs build, assemble and enrich phases, determines status and releases resources in a finally block. A particularly useful inspected rule changes SUCCESS to PARTIAL_SUCCESS whenever errors remain. The PDF pipeline has explicit processing success/failure counts and assembly through a reading-order model. Consumers must inspect status and errors instead of treating a nonempty text export as complete coverage.
      State, models and output:
        ConversionResult is per-document processing state; it is not a business database. Model artifacts can live in a configured artifacts directory and pipeline instances can be reused. The pipeline options expose OCR choices and table-processing choices. Optional image-description/API paths accept remote-service configuration; remote processing must be deliberately understood when selecting those options. The public library can be used locally, but local Python execution alone does not establish that every enabled model, download or optional service is offline.
      Authentication and deployment:
        The core converter is a Python library, not a multi-tenant identity service. A server wrapping it must control file access, URLs, input limits, job scheduling, authorization and output retention. Optional dependencies and model downloads affect installation and hardware requirements. The inspected configuration supports document timeouts and error reporting; large, malformed or hostile inputs still need bounded execution in any deployment. No OCR model, GPU pipeline, external API or server was run in this research.
      Extension points and licensing:
        Format options and backend/pipeline interfaces are the principal extension seams. An application can choose another OCR option, customize enrichment or add a format-specific backend without redesigning all downstream consumers. Root code is MIT-licensed, while model weights and dependencies retain their own terms. The repository and pyproject identify a broad ecosystem; this investigation did not verify all optional backends or the terms of every model artifact.
      What remains to learn:
        A useful runtime study would collect representative scanned, digital and mixed-layout documents, including rotated pages, multi-page tables, handwriting and deliberately unreadable regions. Compare extracted fields against human-labelled page regions, separately measuring reading order, table structure and missing coverage. Exercise a timeout and a failed page to verify partial-success propagation into exported formats. Measure CPU/GPU memory, model initialization and steady-state latency separately. No accuracy percentage follows from this source inspection.
    findings:
      - id:
          P04-docling:DO-01
        project_id:
          P04-docling
        evidence_kind:
          Code
        claim:
          Format options select backends and cached pipelines.
        source:
          repository_id:
            P04-docling
          repository:
            docling-project/docling
          revision:
            0e54294231b69bc2cf7a39873235495788f76b57
          path:
            docling/document_converter.py
          sha256:
            50f0af029f7ae04f925f769e1ec4c004dae842f6032d24df70dc8c459b772977
          url:
            https://github.com/docling-project/docling/blob/0e54294231b69bc2cf7a39873235495788f76b57/docling/document_converter.py
          local_snapshot_retained_not_published:
            True
        runtime_verified:
          False
      - id:
          P04-docling:DO-02
        project_id:
          P04-docling
        evidence_kind:
          Code
        claim:
          Build/assemble/enrich phases set partial success when errors remain.
        source:
          repository_id:
            P04-docling
          repository:
            docling-project/docling
          revision:
            0e54294231b69bc2cf7a39873235495788f76b57
          path:
            docling/pipeline/base_pipeline.py
          sha256:
            ac7db6844c9384f8c558ef2bb82ec2fec5b41ab98b2e6d1cce35baddbecf924e
          url:
            https://github.com/docling-project/docling/blob/0e54294231b69bc2cf7a39873235495788f76b57/docling/pipeline/base_pipeline.py
          local_snapshot_retained_not_published:
            True
        runtime_verified:
          False
      - id:
          P04-docling:DO-03
        project_id:
          P04-docling
        evidence_kind:
          Code
        claim:
          PDF pipeline contains threaded processing stages and reading-order assembly.
        source:
          repository_id:
            P04-docling
          repository:
            docling-project/docling
          revision:
            0e54294231b69bc2cf7a39873235495788f76b57
          path:
            docling/pipeline/standard_pdf_pipeline.py
          sha256:
            eef33425f793815ca32629ea7e2068fa6f1f27ebd2bf4950cf933ec5812cfa16
          url:
            https://github.com/docling-project/docling/blob/0e54294231b69bc2cf7a39873235495788f76b57/docling/pipeline/standard_pdf_pipeline.py
          local_snapshot_retained_not_published:
            True
        runtime_verified:
          False
      - id:
          P04-docling:DO-04
        project_id:
          P04-docling
        evidence_kind:
          Code
        claim:
          OCR, table and optional remote enrichment options are explicit.
        source:
          repository_id:
            P04-docling
          repository:
            docling-project/docling
          revision:
            0e54294231b69bc2cf7a39873235495788f76b57
          path:
            docling/datamodel/pipeline_options.py
          sha256:
            60b31cac740b72e2b872b46b5e981b701386016b41b773b8491820d3fb8fe8e8
          url:
            https://github.com/docling-project/docling/blob/0e54294231b69bc2cf7a39873235495788f76b57/docling/datamodel/pipeline_options.py
          local_snapshot_retained_not_published:
            True
        runtime_verified:
          False
      - id:
          P04-docling:DO-05
        project_id:
          P04-docling
        evidence_kind:
          License
        claim:
          Root source license is MIT; external model terms are separate.
        source:
          repository_id:
            P04-docling
          repository:
            docling-project/docling
          revision:
            0e54294231b69bc2cf7a39873235495788f76b57
          path:
            LICENSE
          sha256:
            edb765d1e3e60d0c7a7d5fba5f2bb2c3c29f7465cecb5c22cf1185c884954e4c
          url:
            https://github.com/docling-project/docling/blob/0e54294231b69bc2cf7a39873235495788f76b57/LICENSE
          local_snapshot_retained_not_published:
            True
        runtime_verified:
          False
    unknowns:
      - Document quality and language performance have not been measured.
      - No complete coverage review of all format backends.
      - No model weights were installed or executed.
    related_projects:
      - P06-browser-use
      - P01-hermes
    repository:
      docling-project/docling
    revision:
      0e54294231b69bc2cf7a39873235495788f76b57
    url:
      https://github.com/docling-project/docling
    source_file_count:
      7
    auxiliary_sources:

  - id:
      P05-temporal
    name:
      Temporal
    category:
      Durable workflow infrastructure
    sections:
      What it is:
        Temporal separates durable workflow coordination from the application workers that execute workflow and activity code. A workflow describes progression and waiting; activities perform work that can involve external systems. The server stores execution history and schedules tasks. This is an infrastructure service with SDKs, not a visual integration catalogue or a language-model agent. Durable recovery of orchestration does not make every external effect exactly-once.
      Server architecture:
        The inspected Go server exposes a frontend workflow API, history handlers and a matching engine. StartWorkflowExecution validates and prepares the request, resolves the namespace identifier, then delegates to the history service. The matching engine deals with task-queue partitions, sticky queues and worker polling. The persistence interfaces separately describe execution state, history events, transactions and conditional-write failures. Application worker code and SDK replay behavior are a separate side of the architecture; this pass inspected server paths and the official workflow documentation.
      Execution flow:
        A client requests a workflow start with identifiers, timeouts and retry-related configuration. Frontend validation passes the request into history handling. Workflow tasks and activity tasks are dispatched via matching to workers polling the relevant queues. Workers return completions, failures or cancellations; history handlers expose corresponding operations and activity heartbeats. A waiting workflow need not keep a request handler alive. Progress is represented by durable execution state and history rather than relying on an in-memory agent conversation.
      Persistence and recovery:
        The persistence contract distinguishes mutable execution state from history event batches and records transaction relationships. Task metadata includes namespace, workflow/run identifiers, scheduled event identity, expiry and version directives. Conditional failures and timeouts are represented explicitly. Official workflow documentation explains deterministic replay: workflow code reconstructs state from history. External I/O belongs in activities, whose retry and timeout semantics must be designed around the external service. Application-side idempotency or reconciliation is still needed when a remote effect succeeds but its acknowledgement is lost.
      Authentication and deployment:
        Namespaces organize execution, but a namespace name is not by itself an authorization boundary. The server's authentication/authorization configuration was not traced in this pass. Deployment includes the Temporal server, a supported persistence backend, appropriate visibility storage/configuration, and application workers running the chosen SDK. Hosted Temporal Cloud and self-hosted Temporal have different operational responsibilities. Server upgrades, workflow code changes, history growth, worker versioning and backup consistency are material areas for a deployment review.
      Extension and licensing:
        Applications extend the system through workflows, activities, worker task queues, signals/updates and SDK integrations rather than by forking the Go server. Root server code is MIT-licensed. Language SDKs and infrastructure dependencies must be inspected at their own pinned versions before asserting compatibility. A design discussion can use Temporal's concepts without deciding to operate a production cluster.
      Follow-up study:
        Trace one workflow through start, activity scheduling, failure, retry, signal, cancellation and completion using a pinned SDK. Restart workers while a timer is outstanding, then interrupt an activity after a stub service has recorded its side effect. Inspect history and the external service ledger independently. A code-change replay test is needed before assuming an in-flight workflow survives a changed implementation. Throughput, recovery time and operational cost remain unmeasured.
    findings:
      - id:
          P05-temporal:TE-01
        project_id:
          P05-temporal
        evidence_kind:
          Code
        claim:
          Frontend start validates, resolves namespace and calls history.
        source:
          repository_id:
            P05-temporal
          repository:
            temporalio/temporal
          revision:
            acd40d635bb3ebd0fde29f59d8c6ff6ef0b33231
          path:
            service/frontend/workflow_handler.go
          sha256:
            2dc49e90d068042701f38388931772c3270eebd02a5a6c16ec5bf381c0726d71
          url:
            https://github.com/temporalio/temporal/blob/acd40d635bb3ebd0fde29f59d8c6ff6ef0b33231/service/frontend/workflow_handler.go
          local_snapshot_retained_not_published:
            True
        runtime_verified:
          False
      - id:
          P05-temporal:TE-02
        project_id:
          P05-temporal
        evidence_kind:
          Code
        claim:
          History API handles task completion/failure, heartbeat and cancellation.
        source:
          repository_id:
            P05-temporal
          repository:
            temporalio/temporal
          revision:
            acd40d635bb3ebd0fde29f59d8c6ff6ef0b33231
          path:
            service/history/handler.go
          sha256:
            f6489761eb4f8a8885c9bb09e4ac0e5a9ccfc607acf6711076c4d0701ddc0ade
          url:
            https://github.com/temporalio/temporal/blob/acd40d635bb3ebd0fde29f59d8c6ff6ef0b33231/service/history/handler.go
          local_snapshot_retained_not_published:
            True
        runtime_verified:
          False
      - id:
          P05-temporal:TE-03
        project_id:
          P05-temporal
        evidence_kind:
          Code
        claim:
          Matching routes workflow/activity tasks through partitioned queues.
        source:
          repository_id:
            P05-temporal
          repository:
            temporalio/temporal
          revision:
            acd40d635bb3ebd0fde29f59d8c6ff6ef0b33231
          path:
            service/matching/matching_engine.go
          sha256:
            c31c93f7b51d96388af58296c3336afe7b710840736f781769cc7059fcadac33
          url:
            https://github.com/temporalio/temporal/blob/acd40d635bb3ebd0fde29f59d8c6ff6ef0b33231/service/matching/matching_engine.go
          local_snapshot_retained_not_published:
            True
        runtime_verified:
          False
      - id:
          P05-temporal:TE-04
        project_id:
          P05-temporal
        evidence_kind:
          Code
        claim:
          Persistence contracts distinguish history, state, conditional errors and transaction identifiers.
        source:
          repository_id:
            P05-temporal
          repository:
            temporalio/temporal
          revision:
            acd40d635bb3ebd0fde29f59d8c6ff6ef0b33231
          path:
            common/persistence/data_interfaces.go
          sha256:
            5f509c2a76bee6a5b749e7c9e55799b04c6f99d4324498bcb34be0c701d75234
          url:
            https://github.com/temporalio/temporal/blob/acd40d635bb3ebd0fde29f59d8c6ff6ef0b33231/common/persistence/data_interfaces.go
          local_snapshot_retained_not_published:
            True
        runtime_verified:
          False
      - id:
          P05-temporal:TE-05
        project_id:
          P05-temporal
        evidence_kind:
          License
        claim:
          Root server license is MIT.
        source:
          repository_id:
            P05-temporal
          repository:
            temporalio/temporal
          revision:
            acd40d635bb3ebd0fde29f59d8c6ff6ef0b33231
          path:
            LICENSE
          sha256:
            6aab9afd99ceb1dcaf6a0d91386b46baef9bce17ae4006044e0f231e31430b69
          url:
            https://github.com/temporalio/temporal/blob/acd40d635bb3ebd0fde29f59d8c6ff6ef0b33231/LICENSE
          local_snapshot_retained_not_published:
            True
        runtime_verified:
          False
    unknowns:
      - SDK replay internals are documented but were not independently executed.
      - Server authorization, replication and backup recovery were not audited.
      - No exactly-once external-effect or performance claim is established.
    related_projects:
      - P02-activepieces
      - P01-hermes
    repository:
      temporalio/temporal
    revision:
      acd40d635bb3ebd0fde29f59d8c6ff6ef0b33231
    url:
      https://github.com/temporalio/temporal
    source_file_count:
      6
    auxiliary_sources:

  - id:
      P06-browser-use
    name:
      Browser Use
    category:
      Browser agent and automation library
    sections:
      What it is:
        Browser Use is a Python system that lets a model operate a browser through structured observations and registered actions. It includes an agent loop as well as browser/session machinery. The open-source library and the separately offered cloud browser/API are distinct surfaces. A browser task can read content, navigate forms, download files or submit changes, but completion of a model-generated plan is not independent proof that a remote business transaction succeeded.
      Architecture and main flow:
        Agent.step prepares browser context, clears stale step outputs, obtains the next model action, executes actions, post-processes results, and finalizes in all cases. Errors enter a central recovery path. BrowserSession manages the browser/CDP connection, targets, tabs and an event bus. The tools registry exposes navigation, element-index or coordinate clicks, input, uploads, extraction, scrolling, screenshots, PDF saving, file operations and completion. DOM services and screenshots provide different observation channels; the model does not have unrestricted knowledge of all site content.
      State and observation:
        The agent keeps a task history and per-step results. Browser state includes tabs, cookies and optionally persisted storage state. The session offers explicit storage-state export and browser-profile selection. Consequently browser identity is a valuable retained capability, not just a convenience file. A source snapshot and the later screenshot can disagree after navigation or page mutation; the loop must observe again. The inspected implementation clears prior results before an LLM call so a timed-out step does not accidentally retain the previous step's outputs.
      Authentication and boundaries:
        The API accepts sensitive-data mappings and domain restrictions. The agent warns when sensitive values are supplied without allowed domains, and checks whether domain-specific credential patterns are covered. Those checks are useful evidence of configuration awareness, not proof that every browser/network path is isolated. Session cookies, downloads, filesystem actions and arbitrary page evaluation create separate authority surfaces. Full prompt-injection resistance, redirect behavior, cross-origin policy and download confinement require targeted tests.
      Deployment and extension:
        A developer supplies a compatible model, browser profile/session and a task, or integrates the tools into another harness. Registered actions can be extended or excluded, and structured final outputs can be configured. Local browser execution and hosted browser operation require different credentials and operational assumptions. The Python package, browser binary and model provider must be versioned separately. No browser was launched by this investigation and no real authenticated account was connected.
      Licensing and practical limits:
        The root library license is MIT; this does not describe commercial cloud service terms or every browser/model dependency. Source includes recovery and timeout machinery, but success against changing websites, MFA, dynamic elements and inaccessible controls is unmeasured here. An action's success response can mean the browser interaction completed, while the site's application rejected the request afterward. Verification should inspect resulting page/application state.
      Next experiments:
        Use a controlled site containing delayed forms, reordered elements, redirects, downloads and a fake authenticated session. Compare DOM-only operation with screenshot fallback. Interrupt the browser connection mid-step and verify honest failure and reconnect behavior. Test that an unapproved destination cannot receive credential substitutions. Measure final-task correctness, interaction count and latency on fixed pages rather than relying on promotional speed comparisons.
    findings:
      - id:
          P06-browser-use:BU-01
        project_id:
          P06-browser-use
        evidence_kind:
          Code
        claim:
          Step ordering and error/finalization handling are explicit.
        source:
          repository_id:
            P06-browser-use
          repository:
            browser-use/browser-use
          revision:
            ccd22fef47a1a36e0c4596fef5db73a5117b9d06
          path:
            browser_use/agent/service.py
          sha256:
            10f7c14458ed7089c49f34a06ad7b3ce12212a589d9d000c5cf4d9cc7ddd8479
          url:
            https://github.com/browser-use/browser-use/blob/ccd22fef47a1a36e0c4596fef5db73a5117b9d06/browser_use/agent/service.py
          local_snapshot_retained_not_published:
            True
        runtime_verified:
          False
      - id:
          P06-browser-use:BU-02
        project_id:
          P06-browser-use
        evidence_kind:
          Code
        claim:
          BrowserSession owns CDP/tab/cookie/storage-state behavior.
        source:
          repository_id:
            P06-browser-use
          repository:
            browser-use/browser-use
          revision:
            ccd22fef47a1a36e0c4596fef5db73a5117b9d06
          path:
            browser_use/browser/session.py
          sha256:
            3b49b2089ee342581f6193ec349d3b91c55b6e6132df8688b8d7746eacb35ecd
          url:
            https://github.com/browser-use/browser-use/blob/ccd22fef47a1a36e0c4596fef5db73a5117b9d06/browser_use/browser/session.py
          local_snapshot_retained_not_published:
            True
        runtime_verified:
          False
      - id:
          P06-browser-use:BU-03
        project_id:
          P06-browser-use
        evidence_kind:
          Code
        claim:
          Tools include structured browser actions and extensible completion output.
        source:
          repository_id:
            P06-browser-use
          repository:
            browser-use/browser-use
          revision:
            ccd22fef47a1a36e0c4596fef5db73a5117b9d06
          path:
            browser_use/tools/service.py
          sha256:
            25746ddfe719c0a800b2b4fcc399aea4fc8be20c48b04ab4118841fd5419eb73
          url:
            https://github.com/browser-use/browser-use/blob/ccd22fef47a1a36e0c4596fef5db73a5117b9d06/browser_use/tools/service.py
          local_snapshot_retained_not_published:
            True
        runtime_verified:
          False
      - id:
          P06-browser-use:BU-04
        project_id:
          P06-browser-use
        evidence_kind:
          Code
        claim:
          Browser configuration includes domain and storage settings.
        source:
          repository_id:
            P06-browser-use
          repository:
            browser-use/browser-use
          revision:
            ccd22fef47a1a36e0c4596fef5db73a5117b9d06
          path:
            browser_use/browser/profile.py
          sha256:
            5b42a8285bab5116c08ec61cad643ed71b546cc9c82cfd77a7d7929330b40a47
          url:
            https://github.com/browser-use/browser-use/blob/ccd22fef47a1a36e0c4596fef5db73a5117b9d06/browser_use/browser/profile.py
          local_snapshot_retained_not_published:
            True
        runtime_verified:
          False
      - id:
          P06-browser-use:BU-05
        project_id:
          P06-browser-use
        evidence_kind:
          License
        claim:
          Root library license is MIT.
        source:
          repository_id:
            P06-browser-use
          repository:
            browser-use/browser-use
          revision:
            ccd22fef47a1a36e0c4596fef5db73a5117b9d06
          path:
            LICENSE
          sha256:
            135c57671b0ee957669b05a0ca00cc06f645496d351e2e732832c6e276da9a5e
          url:
            https://github.com/browser-use/browser-use/blob/ccd22fef47a1a36e0c4596fef5db73a5117b9d06/LICENSE
          local_snapshot_retained_not_published:
            True
        runtime_verified:
          False
    unknowns:
      - No live-site success, isolation or latency benchmark.
      - Cloud implementation was not inspected.
      - No comparison with Ego Lite has been run.
    related_projects:
      - P11-ego-lite
      - P01-hermes
    repository:
      browser-use/browser-use
    revision:
      ccd22fef47a1a36e0c4596fef5db73a5117b9d06
    url:
      https://github.com/browser-use/browser-use
    source_file_count:
      9
    auxiliary_sources:

  - id:
      P07-langfuse
    name:
      Langfuse
    category:
      Agent observability and evaluation platform
    sections:
      What it is:
        Langfuse records and analyzes LLM application activity: traces, observations, model calls, scores, datasets, experiments and prompts. It can help answer what a run did and how a version scored. An observability system records evidence supplied to it; it does not independently establish that a domain action was correct. An evaluator's score remains dependent on the evaluator, dataset and rubric.
      Architecture:
        The inspected deployment separates a web/API service and a worker and includes PostgreSQL, ClickHouse, Redis and S3-compatible object storage through MinIO. PostgreSQL schemas contain identities, organizations/projects, API keys, memberships, datasets, prompts and job configuration. ClickHouse is used in the ingestion service for observation/trace/score records. Redis and background workers support asynchronous processing; object storage supports ingestion/media paths. This is a multi-service data system, not just a browser charting library.
      Trace-to-evaluation flow:
        Instrumented application events reach ingestion. The inspected OpenTelemetry worker converts resource spans into event inputs, enriches event records, optionally processes media, and separately schedules observation evaluations and direct event-table writes. Evaluation configuration retrieval can fail without preventing every other processing step. IngestionService dispatches different event types and merges trace/observation updates before persistence. Its handling of stored and incoming records matters when events arrive out of order. A queued evaluation and a persisted event are related but independently failing operations.
      Storage and governance:
        Trace content can contain prompts, tool arguments, returned text and media references; it can therefore be as sensitive as the application being observed. Schema identity, trace IDs and project IDs must remain consistent through ingestion and UI reads. Dataset items and runs provide test organization, while prompt versions and scores provide change/evaluation metadata. Retention, deletion across stores, masking and large-field overflow are additional paths that were located but not exhaustively audited.
      Authorization:
        The inspected authorize function scopes policies to a tenant and resource, prefers an exact-resource match over a wildcard, and denies when there is no matching action grant or a matching deny. Wildcards are not accepted as concrete authorization targets. The schema also distinguishes organizations, projects, memberships and API keys. This establishes an explicit policy model; it does not prove all API/UI/export paths invoke it correctly.
      Deployment, extensions and licensing:
        Applications integrate through supported instrumentation/API paths; operators configure evaluators, prompt workflows and storage. Self-hosting requires managing multiple durable stores and background processing rather than just installing an SDK. The root license uses MIT for code outside designated enterprise directories and preserves separate third-party terms. The pinned deployment currently references version-4 images; older version-3 deployment assumptions should not be silently reused.
      Follow-up work:
        Trace a redacted test application through SDK batching, ingestion acknowledgement, worker processing and UI visibility. Force out-of-order events, duplicate uploads, a stopped worker and unavailable object storage. Test masking before data leaves the application and deletion across all retained stores. For evaluation, use human-labelled outcomes and report disagreement between model judges and ground truth. Neither instrumenting a run nor receiving a high score proves the original action happened correctly.
    findings:
      - id:
          P07-langfuse:LF-01
        project_id:
          P07-langfuse
        evidence_kind:
          Code/config
        claim:
          Web, worker, PostgreSQL, ClickHouse, Redis and object storage are separate deployment services.
        source:
          repository_id:
            P07-langfuse
          repository:
            langfuse/langfuse
          revision:
            358f6237dded88571ce55cbd6db8836f433a4635
          path:
            docker-compose.yml
          sha256:
            cbadc35c66f78297aa758a9cfd7f2d1e36ba7146c60985c77bff448d023a29f2
          url:
            https://github.com/langfuse/langfuse/blob/358f6237dded88571ce55cbd6db8836f433a4635/docker-compose.yml
          local_snapshot_retained_not_published:
            True
        runtime_verified:
          False
      - id:
          P07-langfuse:LF-02
        project_id:
          P07-langfuse
        evidence_kind:
          Code
        claim:
          OTel event enrichment feeds evaluation scheduling and persistence separately.
        source:
          repository_id:
            P07-langfuse
          repository:
            langfuse/langfuse
          revision:
            358f6237dded88571ce55cbd6db8836f433a4635
          path:
            worker/src/features/otel-ingestion/processOtelEvents.ts
          sha256:
            56a70e7a4404d01d70250ec5acab15223d1663ab96911b866ec201e8fb4b6a96
          url:
            https://github.com/langfuse/langfuse/blob/358f6237dded88571ce55cbd6db8836f433a4635/worker/src/features/otel-ingestion/processOtelEvents.ts
          local_snapshot_retained_not_published:
            True
        runtime_verified:
          False
      - id:
          P07-langfuse:LF-03
        project_id:
          P07-langfuse
        evidence_kind:
          Code
        claim:
          Ingestion merges multiple event types and stored records.
        source:
          repository_id:
            P07-langfuse
          repository:
            langfuse/langfuse
          revision:
            358f6237dded88571ce55cbd6db8836f433a4635
          path:
            worker/src/services/IngestionService/index.ts
          sha256:
            1c36ecacd99a66ba76da062942119b8aae8146cc77ae94d014e7684943cf2c43
          url:
            https://github.com/langfuse/langfuse/blob/358f6237dded88571ce55cbd6db8836f433a4635/worker/src/services/IngestionService/index.ts
          local_snapshot_retained_not_published:
            True
        runtime_verified:
          False
      - id:
          P07-langfuse:LF-04
        project_id:
          P07-langfuse
        evidence_kind:
          Code
        claim:
          Authorization is tenant/resource/action based with deny handling.
        source:
          repository_id:
            P07-langfuse
          repository:
            langfuse/langfuse
          revision:
            358f6237dded88571ce55cbd6db8836f433a4635
          path:
            web/src/features/rbac/authorize.ts
          sha256:
            6d8cd0467a1cb4a2068de1cc4d9a3aa56375fc2feb3c6785b057686d1dbf8ee5
          url:
            https://github.com/langfuse/langfuse/blob/358f6237dded88571ce55cbd6db8836f433a4635/web/src/features/rbac/authorize.ts
          local_snapshot_retained_not_published:
            True
        runtime_verified:
          False
      - id:
          P07-langfuse:LF-05
        project_id:
          P07-langfuse
        evidence_kind:
          Schema
        claim:
          Identity, dataset, prompt and job configuration models live in the relational schema.
        source:
          repository_id:
            P07-langfuse
          repository:
            langfuse/langfuse
          revision:
            358f6237dded88571ce55cbd6db8836f433a4635
          path:
            packages/shared/prisma/schema.prisma
          sha256:
            0a854510c39da9a8875bae026a055d437ecdcc31944c03f8f09476555c0b74d8
          url:
            https://github.com/langfuse/langfuse/blob/358f6237dded88571ce55cbd6db8836f433a4635/packages/shared/prisma/schema.prisma
          local_snapshot_retained_not_published:
            True
        runtime_verified:
          False
      - id:
          P07-langfuse:LF-06
        project_id:
          P07-langfuse
        evidence_kind:
          License
        claim:
          Root license excludes designated enterprise paths from MIT coverage.
        source:
          repository_id:
            P07-langfuse
          repository:
            langfuse/langfuse
          revision:
            358f6237dded88571ce55cbd6db8836f433a4635
          path:
            LICENSE
          sha256:
            fd09d42b5b16606ad2042cc1edf3a82da1c47743709f170c959c74758af229d6
          url:
            https://github.com/langfuse/langfuse/blob/358f6237dded88571ce55cbd6db8836f433a4635/LICENSE
          local_snapshot_retained_not_published:
            True
        runtime_verified:
          False
    unknowns:
      - End-to-end ingestion and deletion have not been executed.
      - All endpoint authorization paths were not audited.
      - No evaluator-quality or operational-cost benchmark.
    related_projects:
      - P09-security-audit
      - P13-arena
      - P05-temporal
    repository:
      langfuse/langfuse
    revision:
      358f6237dded88571ce55cbd6db8836f433a4635
    url:
      https://github.com/langfuse/langfuse
    source_file_count:
      10
    auxiliary_sources:

  - id:
      P08-letta
    name:
      Letta / Letta Code
    category:
      Stateful agent runtime
    sections:
      Project identity and change:
        The original letta-ai/letta repository now explicitly directs active development to letta-ai/letta-code and retains the former V1 API server on an archive branch. Both repository identities are pinned in this library. A description of the old Python server must not be presented as the current runtime. The inspected active package is a TypeScript agent harness with a terminal interface, App Server, channel support and local/cloud backend choices.
      Architecture:
        The runtime separates agent identity and conversation state from the computer on which tools execute. The README describes local operation and Letta Cloud, which retains agent memory, identity and conversations while execution can occur on different machines. Public package exports include App Server client/protocol, memory-confinement, MCP and channel surfaces. Memory, approvals and server transport are independent subsystems. The hosted Cloud backend is described by upstream documentation; its full production implementation was not inspected here.
      Memory flow and persistence:
        MemFS stores agent memory in filesystem structures with Git-backed history. The inspected memory-filesystem module resolves per-agent/scoped roots, creates directories, stamps memory-enabled tags on agent creation and materializes local memory checkouts. Memory-runtime resolves whether MemFS is enabled from persisted settings with an in-memory fallback. This makes memory an explicit artifact with lifecycle and history. It does not establish that a model-written memory statement is factually correct, that every Git conflict is automatically resolved, or that all changes have human approval.
      Approval and execution flow:
        Resume handling reads message history to reconstruct pending tool approvals and recognizes completed tool-call IDs. The batch execution code distinguishes allow/deny decisions, determines which tools can run in parallel, groups resource-sensitive operations and exposes hooks before tool execution and immediately after a result settles. Those hooks are intended seams for durable checkpoints. Inspecting their declarations does not prove all callers persist them correctly. Tool-call identity, approval state and actual side effects remain separate facts.
      Server, authentication and channels:
        The App Server CLI parses a WebSocket listener and capability-token or signed-bearer-token configuration, including issuer, audience and clock-skew options. Documentation distinguishes loopback use from non-loopback listeners. Channels connect external conversations to agent sessions; their availability does not establish equal identity or access-control semantics. The channel README and server entry were inspected, but provider-specific inbound authentication and tenant authorization were not audited.
      Deployment, extension and license:
        The current package can run interactively or serve remote clients. Skills, hooks, model connections, channels and mods are extension surfaces. Some cloud-oriented functionality requires a Letta account. Git-backed memory, runtime state, filesystem access and provider credentials each need a defined backup/security boundary. The active letta-code repository carries Apache-2.0; the original landing repository's identity and historical licensing remain separate. No Letta package was installed or agent launched in this research.
      Outstanding tests:
        Follow one local conversation from creation to tool approval, completion, restart and resume. Edit the same memory from two sessions and inspect conflict behavior. Test revocation of a server token while a tool approval is pending. Compare local versus cloud state location and export behavior, using current documentation rather than removed AgentFile assumptions. Measure whether memory improves a fixed longitudinal task rather than accepting learning as a guaranteed outcome.
    findings:
      - id:
          P08-letta:LE-01
        project_id:
          P08-letta
        evidence_kind:
          Documentation
        claim:
          Main repository redirects active development to letta-code and labels the old API server historical.
        source:
          repository_id:
            P08-letta
          repository:
            letta-ai/letta
          revision:
            5bcdd177d70fa2b31a754cfcd801e77b2e1ab16a
          path:
            README.md
          sha256:
            1d624e8fd383c1198c8d42da87b055d591a5760e19607692eb46bbbfe2a58f03
          url:
            https://github.com/letta-ai/letta/blob/5bcdd177d70fa2b31a754cfcd801e77b2e1ab16a/README.md
          local_snapshot_retained_not_published:
            True
        runtime_verified:
          False
      - id:
          P08-letta:LE-02
        project_id:
          P08-letta
        evidence_kind:
          Code
        claim:
          Memory roots and local Git-backed checkout lifecycle are explicit.
        source:
          repository_id:
            P08-letta-code
          repository:
            letta-ai/letta-code
          revision:
            fec88933a15e90a09e38d42315d8a9e5caf3f79c
          path:
            src/agent/memory-filesystem.ts
          sha256:
            a2884fd2e467af615a7a56584ccf9df520e470c6eef39930a98ec7dc10bfe628
          url:
            https://github.com/letta-ai/letta-code/blob/fec88933a15e90a09e38d42315d8a9e5caf3f79c/src/agent/memory-filesystem.ts
          local_snapshot_retained_not_published:
            True
        runtime_verified:
          False
      - id:
          P08-letta:LE-03
        project_id:
          P08-letta
        evidence_kind:
          Code
        claim:
          Resume logic reconstructs pending approvals from messages.
        source:
          repository_id:
            P08-letta-code
          repository:
            letta-ai/letta-code
          revision:
            fec88933a15e90a09e38d42315d8a9e5caf3f79c
          path:
            src/agent/check-approval.ts
          sha256:
            89fb75c097b2a4aa637e9d1f279c1ea26dbc248b5428ab457cdf9aa6cef3d639
          url:
            https://github.com/letta-ai/letta-code/blob/fec88933a15e90a09e38d42315d8a9e5caf3f79c/src/agent/check-approval.ts
          local_snapshot_retained_not_published:
            True
        runtime_verified:
          False
      - id:
          P08-letta:LE-04
        project_id:
          P08-letta
        evidence_kind:
          Code
        claim:
          Approval execution exposes before-execution and post-result checkpoint hooks.
        source:
          repository_id:
            P08-letta-code
          repository:
            letta-ai/letta-code
          revision:
            fec88933a15e90a09e38d42315d8a9e5caf3f79c
          path:
            src/agent/approval-execution.ts
          sha256:
            218d28112df05114f6ca4d75eee330883538072f695a2d778130e7e0976803b4
          url:
            https://github.com/letta-ai/letta-code/blob/fec88933a15e90a09e38d42315d8a9e5caf3f79c/src/agent/approval-execution.ts
          local_snapshot_retained_not_published:
            True
        runtime_verified:
          False
      - id:
          P08-letta:LE-05
        project_id:
          P08-letta
        evidence_kind:
          Code
        claim:
          App Server command accepts WebSocket authentication configuration.
        source:
          repository_id:
            P08-letta-code
          repository:
            letta-ai/letta-code
          revision:
            fec88933a15e90a09e38d42315d8a9e5caf3f79c
          path:
            src/cli/subcommands/app-server.ts
          sha256:
            9909cdbb170578ca66ff56818a21d4f88d09e3bc8806e8bfc05a0bcc669a5b6a
          url:
            https://github.com/letta-ai/letta-code/blob/fec88933a15e90a09e38d42315d8a9e5caf3f79c/src/cli/subcommands/app-server.ts
          local_snapshot_retained_not_published:
            True
        runtime_verified:
          False
      - id:
          P08-letta:LE-06
        project_id:
          P08-letta
        evidence_kind:
          License
        claim:
          Active runtime source is Apache-2.0.
        source:
          repository_id:
            P08-letta-code
          repository:
            letta-ai/letta-code
          revision:
            fec88933a15e90a09e38d42315d8a9e5caf3f79c
          path:
            LICENSE
          sha256:
            036e78b9d7dd33ae5b378fdda973b4aad7901c8d8371a0ae40fae1f6659a89d0
          url:
            https://github.com/letta-ai/letta-code/blob/fec88933a15e90a09e38d42315d8a9e5caf3f79c/LICENSE
          local_snapshot_retained_not_published:
            True
        runtime_verified:
          False
    unknowns:
      - Cloud service internals are outside the inspected source.
      - Memory correctness, merge recovery and approval durability are untested.
      - The historical Python API was not substituted for the current runtime.
    related_projects:
      - P01-hermes
      - P21-openhands
      - P10-skills
    repository:
      letta-ai/letta
    revision:
      5bcdd177d70fa2b31a754cfcd801e77b2e1ab16a
    url:
      https://github.com/letta-ai/letta
    source_file_count:
      3
    auxiliary_sources:
      - repository:
          letta-ai/letta-code
        revision:
          fec88933a15e90a09e38d42315d8a9e5caf3f79c
        url:
          https://github.com/letta-ai/letta-code
  - id:
      P09-security-audit
    name:
      Cloudflare Security Audit Skill
    category:
      Security research workflow
    sections:
      What it is:
        This repository packages a procedure for a coding agent to investigate a codebase and retain verified findings. Its main product is an audit workflow plus structured artifacts and validators. It is not an always-on firewall, an identity provider or a certificate that a target is secure. The discovery model, target source and execution environment remain external dependencies.
      Architecture and flow:
        The documented workflow starts by mapping architecture, trust boundaries and input surfaces into a coverage ledger. Hunting tasks investigate ledger units. Candidate findings then go to fresh verifiers who attempt to disprove them. Findings are recorded under confirmed, needs_validation or rejected verdicts. Another verification step checks final source claims before reports are generated from the structured records. Keeping a rejected candidate is useful: it retains why a suspicion failed instead of turning every deviation from a checklist into a vulnerability.
      Artifacts and state:
        The coverage ledger tracks investigated units and gaps; findings.json records stable fingerprints, traces, evidence, prerequisites and outcomes. The report schema requires explicit source files/lines and scopes for trace entries. A stable fingerprint is meant to survive a change in verdict. Reports are derived views of this retained state. Repeated audits can revisit changed source and unresolved gaps, but a ledger's existence is not proof every attack path has been covered.
      Validator mechanics:
        The inspected Node validator interprets the repository's supported schema keywords and adds finding-specific checks. It bounds input size, nesting, array items and error output, uses fatal UTF-8 decoding and sanitizes diagnostics. This validates structure and consistency of submitted records. It cannot decide whether an exploit actually occurred merely because an evidence paragraph is well-formed. Runtime evidence and independent source checking are separate requirements.
      Execution and trust:
        The workflow requires an agent with tool use and separate verifier contexts, plus an OS-enforced sandbox for target-controlled code. Documentation calls for controlled networking, resource limits, a sanitized environment and restricted writes; when these are absent, an unresolved lead remains needs_validation. Target code, tests and instructions can be adversarial inputs to the auditor. The investigation should preserve that distinction even when a repository contains its own audit instructions.
      Extension, license and use boundaries:
        Attack-class guides cover AI tools, auth, client-side behavior, cloud, supply chain, data isolation and desktop/mobile boundaries. The guides can be selected according to a target's actual surfaces. Root license is MIT. We read the workflow, report schema and validator as source material; we did not activate the skill, launch an audit fleet, run target code or claim a security assessment of any project in this library.
      Next validation:
        Test the validators with both valid and deliberately malformed records, then conduct a narrowly scoped audit against a known test fixture containing a confirmed flaw and a plausible false positive. Check that the verifier disproves the false positive and preserves the real evidence. Evaluate audit coverage and reproducibility separately from the number of findings. No discovery-rate or safety percentage has been established here.
    findings:
      - id:
          P09-security-audit:SA-01
        project_id:
          P09-security-audit
        evidence_kind:
          Documentation
        claim:
          Audit stages separate discovery, adversarial verification and reporting.
        source:
          repository_id:
            P09-security-audit
          repository:
            cloudflare/security-audit-skill
          revision:
            c1c8a8c1471069fb0e188eeaff69b8e8db6564a8
          path:
            README.md
          sha256:
            55e793bbea3563f8246735997c07aaee360e043eeb626f0b56ea6161c8618ae7
          url:
            https://github.com/cloudflare/security-audit-skill/blob/c1c8a8c1471069fb0e188eeaff69b8e8db6564a8/README.md
          local_snapshot_retained_not_published:
            True
        runtime_verified:
          False
      - id:
          P09-security-audit:SA-02
        project_id:
          P09-security-audit
        evidence_kind:
          Schema
        claim:
          Verdict-specific records include source traces, evidence and conditions.
        source:
          repository_id:
            P09-security-audit
          repository:
            cloudflare/security-audit-skill
          revision:
            c1c8a8c1471069fb0e188eeaff69b8e8db6564a8
          path:
            skills/security-audit/report-schema.json
          sha256:
            6575c9de4a62255699ea052ebf9a49ebfb373a32891bcd89af6f55cc84b35519
          url:
            https://github.com/cloudflare/security-audit-skill/blob/c1c8a8c1471069fb0e188eeaff69b8e8db6564a8/skills/security-audit/report-schema.json
          local_snapshot_retained_not_published:
            True
        runtime_verified:
          False
      - id:
          P09-security-audit:SA-03
        project_id:
          P09-security-audit
        evidence_kind:
          Code
        claim:
          Validator enforces bounded structured input and finding-specific checks.
        source:
          repository_id:
            P09-security-audit
          repository:
            cloudflare/security-audit-skill
          revision:
            c1c8a8c1471069fb0e188eeaff69b8e8db6564a8
          path:
            skills/security-audit/validate-findings.cjs
          sha256:
            e85f232e36bfac0f866f244da50376692d6b45c690beadcb00608b0e6c8b5283
          url:
            https://github.com/cloudflare/security-audit-skill/blob/c1c8a8c1471069fb0e188eeaff69b8e8db6564a8/skills/security-audit/validate-findings.cjs
          local_snapshot_retained_not_published:
            True
        runtime_verified:
          False
      - id:
          P09-security-audit:SA-04
        project_id:
          P09-security-audit
        evidence_kind:
          Documentation
        claim:
          Final reporting is derived from verified records.
        source:
          repository_id:
            P09-security-audit
          repository:
            cloudflare/security-audit-skill
          revision:
            c1c8a8c1471069fb0e188eeaff69b8e8db6564a8
          path:
            skills/security-audit/VALIDATION-AND-REPORTING.md
          sha256:
            b892470cb89bb31f33403e050d4bdfbe2cdaef940ade1496fa65e32b2e129449
          url:
            https://github.com/cloudflare/security-audit-skill/blob/c1c8a8c1471069fb0e188eeaff69b8e8db6564a8/skills/security-audit/VALIDATION-AND-REPORTING.md
          local_snapshot_retained_not_published:
            True
        runtime_verified:
          False
    unknowns:
      - No actual target audit was performed.
      - Validator success cannot substantiate the semantic truth of findings.
      - Coverage completeness depends on investigation and target scope.
    related_projects:
      - P07-langfuse
      - P15-rea
      - P13-arena
    repository:
      cloudflare/security-audit-skill
    revision:
      c1c8a8c1471069fb0e188eeaff69b8e8db6564a8
    url:
      https://github.com/cloudflare/security-audit-skill
    source_file_count:
      6
    auxiliary_sources:

  - id:
      P10-skills
    name:
      Vercel Skills / Find Skills
    category:
      Capability discovery and distribution
    sections:
      What it is:
        The skills CLI discovers and distributes reusable agent instruction packages. A skill typically combines a SKILL.md description with supporting scripts or reference files. Find Skills is the discovery capability within this ecosystem. Installing a skill makes material available to an agent client; it does not create an OS sandbox, grant application permissions, or prove that the instructions are useful or trustworthy.
      Architecture and flow:
        The CLI parses a source reference, locates candidate skill directories, reads skill metadata and installs selected packages for chosen agent environments. The find command sends a query to a search API, defaulting to skills.sh, and formats matching names, sources and popularity metadata. The source parser supports different repository/URL/local forms. Discovery parses frontmatter and searches bounded directory structures. Installation integrates with agent-specific locations and supports shared symlinks or copies.
      State and metadata:
        The implementation references local lock data when discovering and matching installed skills. The installed files, canonical source, selected skill and update state are the relevant persistent artifacts. Symlinks reduce duplicate copies but also mean multiple agent clients can see the same changed content. Copy installs have separate update drift. A pinned version or hash is necessary to distinguish what was reviewed from what a later update supplies.
      Trust and authentication:
        The inspected search and skill parsers sanitize displayed metadata and strip terminal control content. Safe-subpath checks help constrain discovery. The README describes using existing Git authentication for private sources. These address particular boundaries; they do not establish that downloaded instructions or scripts are safe to execute. A skill's prose is content supplied to an agent, and any executable helpers retain the agent's actual tool permissions. Search ranking and installation counts are discovery signals, not verification.
      Deployment and extension:
        The CLI runs in the development/agent environment and supports many clients through location mappings. A publisher can add a repository containing skills and metadata rather than host a new application service. Discovery via skills.sh introduces a network dependency, while local/repository installation can use a known source directly. Current add/use/find/update behavior should be checked at a pinned release; the package itself can change independently of a chosen skill repository.
      License and investigation boundary:
        The CLI root is MIT-licensed. Each skill repository and bundled asset has its own terms. We inspected the search, discovery, add orchestration and source parsing code. We did not install a third-party skill or run its scripts. Installer helpers, archive extraction, lock mutation and all path edge cases were not fully audited.
      Next study:
        Trace a small skill from a pinned local/repository source into two agent clients, then update and remove it while checking lock state and symlink targets. Test duplicate names, malformed metadata, unsafe relative paths and interrupted installation. Independently assess the instruction content and scripts. Keep package provenance distinct from the evaluation result of the capability it supplies.
    findings:
      - id:
          P10-skills:SK-01
        project_id:
          P10-skills
        evidence_kind:
          Code
        claim:
          Find Skills queries a configurable search API and sanitizes result metadata.
        source:
          repository_id:
            P10-skills
          repository:
            vercel-labs/skills
          revision:
            13e4063a1cf913f5606d57d42ab83a86f5001e04
          path:
            src/find.ts
          sha256:
            aa845ea84c80cee4f34db1fdabfab653dd3a7927e9a809d522402fb80e9b6d14
          url:
            https://github.com/vercel-labs/skills/blob/13e4063a1cf913f5606d57d42ab83a86f5001e04/src/find.ts
          local_snapshot_retained_not_published:
            True
        runtime_verified:
          False
      - id:
          P10-skills:SK-02
        project_id:
          P10-skills
        evidence_kind:
          Code
        claim:
          Discovery parses SKILL.md metadata and references local lock state.
        source:
          repository_id:
            P10-skills
          repository:
            vercel-labs/skills
          revision:
            13e4063a1cf913f5606d57d42ab83a86f5001e04
          path:
            src/skills.ts
          sha256:
            6ec366e2a4f48767b3532c3dfa09cfb31857c8bb7c94ab109d5dfff0855ab371
          url:
            https://github.com/vercel-labs/skills/blob/13e4063a1cf913f5606d57d42ab83a86f5001e04/src/skills.ts
          local_snapshot_retained_not_published:
            True
        runtime_verified:
          False
      - id:
          P10-skills:SK-03
        project_id:
          P10-skills
        evidence_kind:
          Code
        claim:
          Add orchestrates agent selection, installation results and warnings.
        source:
          repository_id:
            P10-skills
          repository:
            vercel-labs/skills
          revision:
            13e4063a1cf913f5606d57d42ab83a86f5001e04
          path:
            src/add.ts
          sha256:
            192180cc9ba3d8622a7cdabb55c26b1a576d53598fa2e9aba7b2b53703ab8e6b
          url:
            https://github.com/vercel-labs/skills/blob/13e4063a1cf913f5606d57d42ab83a86f5001e04/src/add.ts
          local_snapshot_retained_not_published:
            True
        runtime_verified:
          False
      - id:
          P10-skills:SK-04
        project_id:
          P10-skills
        evidence_kind:
          Code
        claim:
          Source parsing distinguishes supported source forms.
        source:
          repository_id:
            P10-skills
          repository:
            vercel-labs/skills
          revision:
            13e4063a1cf913f5606d57d42ab83a86f5001e04
          path:
            src/source-parser.ts
          sha256:
            d498dbe96231b85d6bab7412d3f16173d0f52f5756360a906fd6efdc4a906b75
          url:
            https://github.com/vercel-labs/skills/blob/13e4063a1cf913f5606d57d42ab83a86f5001e04/src/source-parser.ts
          local_snapshot_retained_not_published:
            True
        runtime_verified:
          False
      - id:
          P10-skills:SK-05
        project_id:
          P10-skills
        evidence_kind:
          License
        claim:
          CLI root is MIT; distributed skills are separate works.
        source:
          repository_id:
            P10-skills
          repository:
            vercel-labs/skills
          revision:
            13e4063a1cf913f5606d57d42ab83a86f5001e04
          path:
            LICENSE
          sha256:
            661142e53c313d2bb5e1b055f5c0a39001450ff1b5e27b89dc4bc7de9a6352ca
          url:
            https://github.com/vercel-labs/skills/blob/13e4063a1cf913f5606d57d42ab83a86f5001e04/LICENSE
          local_snapshot_retained_not_published:
            True
        runtime_verified:
          False
    unknowns:
      - No complete installer supply-chain audit.
      - No third-party skill was installed or benchmarked.
      - Search service internals are not in this inspected CLI scope.
    related_projects:
      - P01-hermes
      - P08-letta
      - P19-universal-modder
    repository:
      vercel-labs/skills
    revision:
      13e4063a1cf913f5606d57d42ab83a86f5001e04
    url:
      https://github.com/vercel-labs/skills
    source_file_count:
      7
    auxiliary_sources:

  - id:
      P11-ego-lite
    name:
      Ego Lite / ego-browser
    category:
      Browser product and agent SDK
    sections:
      What is public and what is not:
        Ego Lite is presented as a browser where users and agents work in separate task spaces while retaining access to browser identity. The public repository is specifically the JavaScript SDK and agent skill. Its CONTRIBUTING document states that the browser application and native bindings are supplied separately by the installed app. This dossier therefore explains the public SDK contract and documented product behavior; it is not a reverse-engineering result for the native browser binary.
      Architecture:
        The installed CLI supplies native globalThis.ego bindings. The repository builds an SDK bundle plus a matching usage guide and skill files. JavaScript agent code calls Page/TaskSpace APIs, which use the SDK's native/CDP bridge. The runtime keeps pending CDP requests, browser/page event subscribers, target/session mappings and child-frame relationships. Native browser functionality remains behind that bridge. The ability to run the SDK's help interface outside the browser does not make browser actions available without the native environment.
      Observe and act flow:
        A snapshot request invokes the native snapshot operation, compacts the returned result and registers element references in a reference map. snapshotText requests full-page text with action marks and stable locator information by default. Screenshot capture is scoped to an explicit target session, with unique temporary filenames. Runtime code distinguishes lost sessions, disappearing frames, dialog-blocked requests and user-control errors. Those distinctions help callers choose recovery without blindly replaying a potentially completed input.
      State and identity:
        Browser logins, cookies and profile data belong to the installed browser. Task spaces provide documented separation of user and agent activity, while SDK reference maps and session IDs connect observations to actions. The public SDK does not prove the native implementation's isolation guarantees or cookie migration correctness. A shared authenticated browser is a strong capability even if the agent works in another visible space.
      Deployment, extension and license:
        Public development uses Node.js and the installed app for real-browser tests. The build emits a single-file SDK bundle alongside a matching guide; using mismatched versions can lead to incorrect tool assumptions. MIT licensing in this repository covers the public material, not an inferred license for the separately delivered browser. Platform support and performance statements in the README remain upstream claims; no native app was installed or measured here.
      What needs artifact/runtime evidence:
        To substantiate native isolation, inspect a specific signed app build and its resources, then run a declared local test with two task spaces and a dummy account. Check storage separation, user takeover, dialogs, downloads, stale element references and crashes after input dispatch. REA is appropriate for that packaged/native investigation if the actual artifact is selected. Public source alone cannot verify the claimed speed or token advantage over other browsers.
    findings:
      - id:
          P11-ego-lite:EG-01
        project_id:
          P11-ego-lite
        evidence_kind:
          Documentation
        claim:
          Public repository supplies SDK/skill; native browser and bindings are separate.
        source:
          repository_id:
            P11-ego-lite
          repository:
            citrolabs/ego-lite
          revision:
            4cf79356509bccdead17863250b442f60a881c25
          path:
            CONTRIBUTING.md
          sha256:
            6fc896b64bab9abb31c5f77c4e9f5042b42d812ea67ac8b4cd617a6a3b1c23db
          url:
            https://github.com/citrolabs/ego-lite/blob/4cf79356509bccdead17863250b442f60a881c25/CONTRIBUTING.md
          local_snapshot_retained_not_published:
            True
        runtime_verified:
          False
      - id:
          P11-ego-lite:EG-02
        project_id:
          P11-ego-lite
        evidence_kind:
          Code
        claim:
          Runtime maps CDP sessions/targets and defines timeout, lifecycle and dialog errors.
        source:
          repository_id:
            P11-ego-lite
          repository:
            citrolabs/ego-lite
          revision:
            4cf79356509bccdead17863250b442f60a881c25
          path:
            package/ego-browser/src/browser-runtime.ts
          sha256:
            7945f1f4639c865f1ab11a38d2cd9ec8ca31706ef6f2db24cacc4d5304129e44
          url:
            https://github.com/citrolabs/ego-lite/blob/4cf79356509bccdead17863250b442f60a881c25/package/ego-browser/src/browser-runtime.ts
          local_snapshot_retained_not_published:
            True
        runtime_verified:
          False
      - id:
          P11-ego-lite:EG-03
        project_id:
          P11-ego-lite
        evidence_kind:
          Code
        claim:
          Snapshots call native bindings and populate reference maps; screenshots can target explicit sessions.
        source:
          repository_id:
            P11-ego-lite
          repository:
            citrolabs/ego-lite
          revision:
            4cf79356509bccdead17863250b442f60a881c25
          path:
            package/ego-browser/src/driver/observe.ts
          sha256:
            2596ffbd7a29de840bb661b071d37a091c04d43d33ebf30bc8fc2024a4e710e3
          url:
            https://github.com/citrolabs/ego-lite/blob/4cf79356509bccdead17863250b442f60a881c25/package/ego-browser/src/driver/observe.ts
          local_snapshot_retained_not_published:
            True
        runtime_verified:
          False
      - id:
          P11-ego-lite:EG-04
        project_id:
          P11-ego-lite
        evidence_kind:
          Code
        claim:
          CDP evaluation is a distinct SDK bridge.
        source:
          repository_id:
            P11-ego-lite
          repository:
            citrolabs/ego-lite
          revision:
            4cf79356509bccdead17863250b442f60a881c25
          path:
            package/ego-browser/src/cdp-eval.ts
          sha256:
            f5a05864d404c665568b1dcab5aa81383671dff560d311b7d21aee7c34de9474
          url:
            https://github.com/citrolabs/ego-lite/blob/4cf79356509bccdead17863250b442f60a881c25/package/ego-browser/src/cdp-eval.ts
          local_snapshot_retained_not_published:
            True
        runtime_verified:
          False
    unknowns:
      - Native browser source/artifact was not inspected.
      - Space isolation, migration, platform support and performance are not independently validated.
      - No live session or user account was connected.
    related_projects:
      - P06-browser-use
      - P15-rea
    repository:
      citrolabs/ego-lite
    revision:
      4cf79356509bccdead17863250b442f60a881c25
    url:
      https://github.com/citrolabs/ego-lite
    source_file_count:
      7
    auxiliary_sources:

  - id:
      P12-zapier-mcp
    name:
      Zapier MCP
    category:
      Hosted integration gateway and client plugin
    sections:
      What is actually public:
        The public repository is a client-plugin distribution for connecting an agent to Zapier MCP. It is not the source of Zapier's hosted integration engine. The plugin manifest and onboarding material describe how a client discovers and connects to that service. Consequently this dossier combines inspected client-side files with explicitly attributed official service documentation. Server database schemas, worker implementations and internal retry behavior remain outside the available evidence.
      Connection and execution flow:
        Official connection documentation describes Streamable HTTP at the shared MCP connect endpoint. A client can use OAuth sign-in or a server token, then discover available tools and invoke actions against connected applications. OAuth refresh behavior belongs to the client/server authorization exchange; application credentials are managed through Zapier connections. A server token is authority to call the configured service, even if the underlying application's password is never shown to the language model. The public plugin configuration points the agent toward this remote boundary.
      Tool selection and authorization:
        Official tool documentation distinguishes agentic discovery from a managed set of tools. Discovery/setup capabilities can find actions and enable appropriate application tools; execution capabilities then perform the selected reads or writes. The documented auto-provisioning path uses the user's own connections and excludes connections merely shared by another user. This is an account/service rule described by Zapier, not something enforced in the small public plugin repository. Availability of additional workflow or custom-code capabilities may depend on account and rollout status.
      State, cost and failure:
        Connections and configured MCP access live in the hosted service. The client retains its own authentication/session material according to its implementation. The usage page reviewed for this dossier describes two tasks per successful external application call, with failed calls and discovery/setup excluded; plan limits can prevent additional calls. This is a dated service-policy observation, not a permanent pricing guarantee. The available source does not establish a durable side-effect receipt protocol, idempotency across application APIs or recovery after a response is lost.
      Extension and licensing boundary:
        A client can select/configure exposed tools and use supported app connections. That does not mean it can modify or independently deploy the underlying Zapier service. The repository's MIT license applies to the public plugin material; it is not a license to self-host the proprietary backend. For an engineering review, track the plugin revision separately from live service documentation and account-specific capability. Hosted behavior can change without a commit to this plugin repository.
      What a later test should establish:
        Use a disposable app connection to inspect discovery, managed-tool restrictions, token revocation, a refused action and an exhausted usage allowance. Check whether client logs expose tokens or returned business data, and what happens when a write succeeds but the MCP connection drops. Compare requests against the intended app account. No Zapier account was connected, no token was created, and no external action was executed for this dossier.
    findings:
      - id:
          P12-zapier-mcp:ZA-01
        project_id:
          P12-zapier-mcp
        evidence_kind:
          Documentation
        claim:
          The repository distributes client integration rather than the hosted engine.
        source:
          repository_id:
            P12-zapier-mcp
          repository:
            zapier/zapier-mcp
          revision:
            5360f152b96735712e5f925ad728732cb86888df
          path:
            README.md
          sha256:
            c4d369332a53f9e0497fac5655e99dd40a2cb5415f20d60b1724d5d87898f2f8
          url:
            https://github.com/zapier/zapier-mcp/blob/5360f152b96735712e5f925ad728732cb86888df/README.md
          local_snapshot_retained_not_published:
            True
        runtime_verified:
          False
      - id:
          P12-zapier-mcp:ZA-02
        project_id:
          P12-zapier-mcp
        evidence_kind:
          Code
        claim:
          The plugin supplies remote MCP connection configuration.
        source:
          repository_id:
            P12-zapier-mcp
          repository:
            zapier/zapier-mcp
          revision:
            5360f152b96735712e5f925ad728732cb86888df
          path:
            plugins/zapier/.mcp.json
          sha256:
            8b8c86a59594a732600b39cd14589c416159086c496ac81341ebbc170e8ad587
          url:
            https://github.com/zapier/zapier-mcp/blob/5360f152b96735712e5f925ad728732cb86888df/plugins/zapier/.mcp.json
          local_snapshot_retained_not_published:
            True
        runtime_verified:
          False
      - id:
          P12-zapier-mcp:ZA-03
        project_id:
          P12-zapier-mcp
        evidence_kind:
          Documentation
        claim:
          Plugin guidance describes onboarding and lifecycle behavior.
        source:
          repository_id:
            P12-zapier-mcp
          repository:
            zapier/zapier-mcp
          revision:
            5360f152b96735712e5f925ad728732cb86888df
          path:
            plugins/zapier/README.md
          sha256:
            8947b4a7eed7232f953279830fc948f7d8dc30d9997c35de4a03da2ba2c9a236
          url:
            https://github.com/zapier/zapier-mcp/blob/5360f152b96735712e5f925ad728732cb86888df/plugins/zapier/README.md
          local_snapshot_retained_not_published:
            True
        runtime_verified:
          False
      - id:
          P12-zapier-mcp:ZA-04
        project_id:
          P12-zapier-mcp
        evidence_kind:
          Documentation
        claim:
          OAuth and server-token flows use Streamable HTTP.
        source:
          url:
            https://docs.zapier.com/mcp/overview/how-connections-work
          evidence_type:
            live_official_documentation
          reviewed_on:
            2026-10-17
          revision:
            None
        runtime_verified:
          False
      - id:
          P12-zapier-mcp:ZA-05
        project_id:
          P12-zapier-mcp
        evidence_kind:
          Documentation
        claim:
          Tool discovery and managed configuration have distinct behavior.
        source:
          url:
            https://docs.zapier.com/mcp/overview/how-tools-work
          evidence_type:
            live_official_documentation
          reviewed_on:
            2026-10-17
          revision:
            None
        runtime_verified:
          False
      - id:
          P12-zapier-mcp:ZA-06
        project_id:
          P12-zapier-mcp
        evidence_kind:
          Documentation
        claim:
          Hosted usage accounting is service policy, not plugin code.
        source:
          url:
            https://docs.zapier.com/mcp/overview/usage
          evidence_type:
            live_official_documentation
          reviewed_on:
            2026-10-17
          revision:
            None
        runtime_verified:
          False
    unknowns:
      - Hosted execution engine is not present in the repository.
      - No account-specific capability or live action tested.
      - Live documentation is not pinned like the Git source.
    related_projects:
      - P02-activepieces
      - P03-nango
      - P16-magic
    repository:
      zapier/zapier-mcp
    revision:
      5360f152b96735712e5f925ad728732cb86888df
    url:
      https://github.com/zapier/zapier-mcp
    source_file_count:
      6
    auxiliary_sources:

  - id:
      P13-arena
    name:
      Arena Skill
    category:
      Candidate generation and tournament evaluation
    sections:
      What it is:
        Arena turns one task into a tournament of alternative answers. A coordinating agent supplies a task brief, competitors receive different strategy cards, and pairwise attacks, defenses and judging reduce the field to one answer. The Python component is a bookkeeping state machine; it does not itself contain the model service or guarantee that the selected answer is correct.
      Architecture and main flow:
        The skill describes plan, init, next, prompts, check, collect, advance and winner commands. Initial competitors write solutions; each match then has two attacks, two defenses and one judge. The coordinator is instructed not to compete or judge. A separate final comparison can compare the champion with a prior baseline. Strategy combinations and a seed vary candidate approaches and pairings. A fixed seed makes that assignment reproducible, not the model's complete reasoning or output.
      Persistent state:
        A run lives under .arena with an arena.json state file and separate briefs, solutions, attacks and verdicts. LATEST points to the active run. State survives the coordinating agent losing conversational context. The next command derives the next phase from disk, while check can identify missing outputs. This is a useful distinction between orchestration progress and transient chat memory. Shared-file concurrency, atomicity and adversarial output handling still require focused validation.
      Cost and evaluation:
        The default is 100 competitors; quick mode uses 16. The source defines five model calls per match after the initial candidate generation, so a full 100-candidate elimination tournament entails 595 calls before an optional baseline judge. That is a plan count, not a measured token or currency cost. Rubric weights cover correctness, completeness, specificity, robustness and clarity. Pairwise judging may still reward convincing errors or share correlated blind spots. The winner is the winner of this procedure, not a proof of truth.
      Execution environment and permissions:
        The orchestrator's agent system actually launches workers and grants their tools. The Python CLI uses standard-library filesystem/JSON state. It is not an execution sandbox or credential broker. Task briefs must carry sufficient context because child agents do not automatically receive the entire parent conversation. No tournament, subagent work or model calls were launched while reviewing this repository.
      License and next tests:
        The root license is MIT. Tests exist for bracket mechanics and consistency with rubric weights; they were inspected as source, not run. A useful validation would start with known-answer tasks and compare a single attempt, a small diverse set and the full bracket at equal cost. Track judge errors, final factual accuracy, missing outputs and variation across seeds. Test resumption after every phase boundary independently of model quality.
    findings:
      - id:
          P13-arena:AR-01
        project_id:
          P13-arena
        evidence_kind:
          Documented procedure
        claim:
          The skill defines independent competitor, attacker, defender and judge roles.
        source:
          repository_id:
            P13-arena
          repository:
            Jakeschincariol/arena-skill
          revision:
            df07b8e518e10cdecd8cd7712d9958b6f396250e
          path:
            skills/arena/SKILL.md
          sha256:
            c06f9828566485d5bd6507150f454d6f37d49c2b02e5308b8f744a4a046bdf39
          url:
            https://github.com/Jakeschincariol/arena-skill/blob/df07b8e518e10cdecd8cd7712d9958b6f396250e/skills/arena/SKILL.md
          local_snapshot_retained_not_published:
            True
        runtime_verified:
          False
      - id:
          P13-arena:AR-02
        project_id:
          P13-arena
        evidence_kind:
          Code
        claim:
          Python maintains disk-backed phases, strategy assignment and match bookkeeping.
        source:
          repository_id:
            P13-arena
          repository:
            Jakeschincariol/arena-skill
          revision:
            df07b8e518e10cdecd8cd7712d9958b6f396250e
          path:
            skills/arena/bracket.py
          sha256:
            f56ba7de9746c1aed77b5d6aee58a3c2ca07bd239896dbe7dba88654694c1fa2
          url:
            https://github.com/Jakeschincariol/arena-skill/blob/df07b8e518e10cdecd8cd7712d9958b6f396250e/skills/arena/bracket.py
          local_snapshot_retained_not_published:
            True
        runtime_verified:
          False
      - id:
          P13-arena:AR-03
        project_id:
          P13-arena
        evidence_kind:
          Documented rubric
        claim:
          Judging weights are explicit.
        source:
          repository_id:
            P13-arena
          repository:
            Jakeschincariol/arena-skill
          revision:
            df07b8e518e10cdecd8cd7712d9958b6f396250e
          path:
            skills/arena/rubric.md
          sha256:
            3296801e01035f3ad8dc2b57f0c47d84d296bbc716bf8b36bdb02b426c2735a5
          url:
            https://github.com/Jakeschincariol/arena-skill/blob/df07b8e518e10cdecd8cd7712d9958b6f396250e/skills/arena/rubric.md
          local_snapshot_retained_not_published:
            True
        runtime_verified:
          False
      - id:
          P13-arena:AR-04
        project_id:
          P13-arena
        evidence_kind:
          Test source
        claim:
          Bracket tests exist; no executed-test claim.
        source:
          repository_id:
            P13-arena
          repository:
            Jakeschincariol/arena-skill
          revision:
            df07b8e518e10cdecd8cd7712d9958b6f396250e
          path:
            tests/test_bracket.py
          sha256:
            2d0ee99256d7b307fc26980284b4b7895c9bcdd15de65918c31803173ded5160
          url:
            https://github.com/Jakeschincariol/arena-skill/blob/df07b8e518e10cdecd8cd7712d9958b6f396250e/tests/test_bracket.py
          local_snapshot_retained_not_published:
            True
        runtime_verified:
          False
    unknowns:
      - No answer-quality improvement has been measured.
      - Model calls and costs were not incurred or benchmarked.
      - No complete malicious-output or concurrent-write audit.
    related_projects:
      - P07-langfuse
      - P09-security-audit
      - P14-orca
    repository:
      Jakeschincariol/arena-skill
    revision:
      df07b8e518e10cdecd8cd7712d9958b6f396250e
    url:
      https://github.com/Jakeschincariol/arena-skill
    source_file_count:
      6
    auxiliary_sources:

  - id:
      P14-orca
    name:
      Orca
    category:
      Multi-agent development workspace
    sections:
      What it is:
        Orca is a developer workspace for running coding agents, terminals, repository worktrees and reviews together. It can present different agent backends side by side and offers desktop, remote-host and companion-client concepts. The agent's reasoning engine is normally supplied by another tool. Orca coordinates execution contexts and user interaction; it should not be confused with a foundation model or a business workflow database.
      Architecture and task flow:
        The source separates Electron/main-process services, renderer-facing interfaces, agent connection adapters and execution-host routing. The inspected startup path resolves the selected repository and SSH connection, chooses a startup agent or linked draft, builds an agent-launch intent and calls a common executor. A workspace factory creates the managed worktree and returns worktree/terminal identifiers. The path distinguishes a workspace successfully created without a startup agent from a complete launch. A worktree's existence therefore does not prove the agent is running.
      Workspace state and lifecycle:
        Git worktrees provide separate checkouts for concurrent tasks. Metadata tracks creation provenance, workspace layout, push targets and ownership. Creation-preparation services and cleanup paths are separate from the UI. Removal checks reject a main repository, a filesystem root, a directory containing the repository, unresolved home authority and nested registered worktrees. These are observed guards around destructive cleanup. They do not make every agent process an OS-isolated tenant.
      Agent and browser boundaries:
        The ACP adapter handles an external agent connection, while other launch modes use terminals. Browser route/partition bindings have their own store. These explicit identities help keep a conversation, execution host and browser route associated, but they are not a complete end-to-end isolation proof. A remote host's filesystem, login state and local resources differ from the desktop's. Credentials used by installed coding agents, SSH and app integrations need separate assessment.
      Deployment and extensibility:
        The project is a TypeScript desktop application with multiple supporting surfaces. Integrations include agent adapters, worktree/terminal routing and remote-runtime behavior. The README describes mobile monitoring, design inspection and review workflows; these product surfaces were not runtime tested. Extending an adapter differs from embedding the whole desktop app. Native packaging, auto-updates, IPC, remote pairing and host lifecycle are larger investigations than the selected code paths here.
      License and validation plan:
        The root is MIT-licensed, with dependencies and remote service terms to assess separately. The next useful study is a disposable Git repository with two agents editing different worktrees: trace launch, terminal/session persistence, restart, follow-up, review and merge. Then disconnect a remote host and attempt cleanup of a nested or unregistered worktree. Verify retained state and actual Git contents rather than inferring success from a UI status. No productivity multiplier, OS isolation or remote recovery claim has been measured.
    findings:
      - id:
          P14-orca:OR-01
        project_id:
          P14-orca
        evidence_kind:
          Code
        claim:
          Startup worktree creation routes through an agent-launch executor with typed workspace results.
        source:
          repository_id:
            P14-orca
          repository:
            stablyai/orca
          revision:
            e65e0bd1e6f2858d267c6fc682abaf69b2436bd6
          path:
            src/main/agent-launch/startup-agent-worktree-create.ts
          sha256:
            2673f22cdbf783b4041a0d8c42f899cc87d3d485ca5a56f61833c4dce1a71306
          url:
            https://github.com/stablyai/orca/blob/e65e0bd1e6f2858d267c6fc682abaf69b2436bd6/src/main/agent-launch/startup-agent-worktree-create.ts
          local_snapshot_retained_not_published:
            True
        runtime_verified:
          False
      - id:
          P14-orca:OR-02
        project_id:
          P14-orca
        evidence_kind:
          Code
        claim:
          Removal guards protect main/root/home/nested worktree paths.
        source:
          repository_id:
            P14-orca
          repository:
            stablyai/orca
          revision:
            e65e0bd1e6f2858d267c6fc682abaf69b2436bd6
          path:
            src/main/worktree-removal-safety.ts
          sha256:
            811ac4a1a2a3f5a4c99f73f0f670ae1c966d363d8aa94c12d4de06728d7f97c1
          url:
            https://github.com/stablyai/orca/blob/e65e0bd1e6f2858d267c6fc682abaf69b2436bd6/src/main/worktree-removal-safety.ts
          local_snapshot_retained_not_published:
            True
        runtime_verified:
          False
      - id:
          P14-orca:OR-03
        project_id:
          P14-orca
        evidence_kind:
          Code
        claim:
          Worktree preparation is an explicit lifecycle service.
        source:
          repository_id:
            P14-orca
          repository:
            stablyai/orca
          revision:
            e65e0bd1e6f2858d267c6fc682abaf69b2436bd6
          path:
            src/main/worktree-create-preparation.ts
          sha256:
            87916ca7d7e75902217edde50b9e2f0df5ffde3b087e86b8ef8896eb2753348e
          url:
            https://github.com/stablyai/orca/blob/e65e0bd1e6f2858d267c6fc682abaf69b2436bd6/src/main/worktree-create-preparation.ts
          local_snapshot_retained_not_published:
            True
        runtime_verified:
          False
      - id:
          P14-orca:OR-04
        project_id:
          P14-orca
        evidence_kind:
          Code
        claim:
          ACP connections and browser partition bindings are separate services.
        source:
          repository_id:
            P14-orca
          repository:
            stablyai/orca
          revision:
            e65e0bd1e6f2858d267c6fc682abaf69b2436bd6
          path:
            src/main/acp/acp-agent-connection.ts
          sha256:
            cee5070ab0a7fec0f21494df88e65ebd01ee2de9cb9a6a0ed6d1db5f589b5f6e
          url:
            https://github.com/stablyai/orca/blob/e65e0bd1e6f2858d267c6fc682abaf69b2436bd6/src/main/acp/acp-agent-connection.ts
          local_snapshot_retained_not_published:
            True
        runtime_verified:
          False
      - id:
          P14-orca:OR-05
        project_id:
          P14-orca
        evidence_kind:
          Documentation
        claim:
          Worktree product behavior is described separately from implementation.
        source:
          repository_id:
            P14-orca
          repository:
            stablyai/orca
          revision:
            e65e0bd1e6f2858d267c6fc682abaf69b2436bd6
          path:
            docs/site/content/docs/model/worktrees.mdx
          sha256:
            e62d90317c541c1f429fba9c2d403600b1246986ea935e1cdd1c59ffa3280f42
          url:
            https://github.com/stablyai/orca/blob/e65e0bd1e6f2858d267c6fc682abaf69b2436bd6/docs/site/content/docs/model/worktrees.mdx
          local_snapshot_retained_not_published:
            True
        runtime_verified:
          False
    unknowns:
      - Only selected paths in a large repository were inspected.
      - Mobile pairing, credential handling and Electron IPC are not fully audited.
      - No agents or worktrees were launched using Orca.
    related_projects:
      - P21-openhands
      - P13-arena
      - P15-rea
    repository:
      stablyai/orca
    revision:
      e65e0bd1e6f2858d267c6fc682abaf69b2436bd6
    url:
      https://github.com/stablyai/orca
    source_file_count:
      9
    auxiliary_sources:

  - id:
      P15-rea
    name:
      REA — Reverse Engineer Anything
    category:
      Artifact and runtime investigation tooling
    sections:
      What it is:
        REA exposes specialized inspection operations for packaged applications, binaries, JavaScript/Electron artifacts and recorded/runtime evidence. It coordinates analysis engines and evidence contracts; it is not a replacement for every upstream tool. Its own skill explicitly directs ordinary full-source architecture questions to normal repository inspection. That is the route used for the source dossiers in this library.
      Versions and scope:
        The project-local installed CLI is rea-agents 6.5.0, with an earlier synthetic JavaScript smoke test retained separately. This library also pins the current upstream source revision for analysis. Those identities are not interchangeable: an operation present in current source may not exist in the installed release. The old smoke test proves only that the installation analyzed that synthetic fixture; it does not validate any of the twenty other projects.
      Architecture and analysis flow:
        The JavaScript application service first validates input against a schema, inventories/reconstructs artifacts within a resource scope, validates resulting metadata and graph bindings, then creates a hashed Evidence record. Cancellation and errors are handled explicitly. Evidence includes graph limitations rather than presenting a graph as omniscient execution history. Provider registry machinery handles native-analysis backends separately from the built-in JavaScript path. A requested operation's requirements depend on its target and provider.
      Evidence and persistence:
        The evidence ledger is the organizing abstraction for retained observations, inferred relationships and unresolved questions. Bundle/export and inspection operations make results reusable across investigation steps. A target hash, tool/provider identity, source location and operation scope are as important as the prose finding. Static references suggest a possible flow; only declared runtime observation can demonstrate an executed one. An empty search under selected limits does not establish absence throughout an application.
      Execution boundaries:
        Offline artifact parsing, native disassembly and live browser/process interaction have different effects. Native workflows can need external engines; recorded capture analysis needs the relevant parsers; active runtime capture can launch or manipulate the selected target. This research did not install new native engines or run unrelated applications. The installed environment's prior notes say native providers were not configured, which remains distinct from a source-level capability list.
      Extension, license and follow-up:
        The repository separates application services, domain schemas, providers and evidence handling. Adding a new analysis surface requires preserving those contracts and honest limitations, rather than just emitting plausible descriptions. Root source is MIT; external engines retain their own installation and license requirements. A future artifact study should select a concrete package and exact version, inspect its inventory, trace a feature through retained evidence, and use a narrowly declared runtime scenario only for claims that static analysis cannot settle.
    findings:
      - id:
          P15-rea:RE-01
        project_id:
          P15-rea
        evidence_kind:
          Code
        claim:
          JavaScript analysis validates input, reconstructs graphs and creates Evidence with limitations.
        source:
          repository_id:
            P15-rea
          repository:
            morluto/rea
          revision:
            5eaef92e5b3f9b15b23f2e4aea6a32a867b89dd0
          path:
            src/application/javascript/JavaScriptApplicationService.ts
          sha256:
            3490668c028812e55e4149460b55b7e81f320f32d31596f22ee9e63651d96941
          url:
            https://github.com/morluto/rea/blob/5eaef92e5b3f9b15b23f2e4aea6a32a867b89dd0/src/application/javascript/JavaScriptApplicationService.ts
          local_snapshot_retained_not_published:
            True
        runtime_verified:
          False
      - id:
          P15-rea:RE-02
        project_id:
          P15-rea
        evidence_kind:
          Code
        claim:
          JavaScript evidence is a separate output contract.
        source:
          repository_id:
            P15-rea
          repository:
            morluto/rea
          revision:
            5eaef92e5b3f9b15b23f2e4aea6a32a867b89dd0
          path:
            src/application/javascript/JavaScriptApplicationEvidence.ts
          sha256:
            5927cc9f58c2d0cfcd1e3db472c0040ede6b68da1375c4ea7a230cdc0e8482cc
          url:
            https://github.com/morluto/rea/blob/5eaef92e5b3f9b15b23f2e4aea6a32a867b89dd0/src/application/javascript/JavaScriptApplicationEvidence.ts
          local_snapshot_retained_not_published:
            True
        runtime_verified:
          False
      - id:
          P15-rea:RE-03
        project_id:
          P15-rea
        evidence_kind:
          Code
        claim:
          Retained findings are managed through an evidence ledger.
        source:
          repository_id:
            P15-rea
          repository:
            morluto/rea
          revision:
            5eaef92e5b3f9b15b23f2e4aea6a32a867b89dd0
          path:
            src/application/investigation/EvidenceLedger.ts
          sha256:
            e0b870721aee65397a93a3dd1ece6e9d1f1e66702cd067a9b4d5418f3b9ebf42
          url:
            https://github.com/morluto/rea/blob/5eaef92e5b3f9b15b23f2e4aea6a32a867b89dd0/src/application/investigation/EvidenceLedger.ts
          local_snapshot_retained_not_published:
            True
        runtime_verified:
          False
      - id:
          P15-rea:RE-04
        project_id:
          P15-rea
        evidence_kind:
          Code
        claim:
          Native provider selection is separate from JavaScript analysis.
        source:
          repository_id:
            P15-rea
          repository:
            morluto/rea
          revision:
            5eaef92e5b3f9b15b23f2e4aea6a32a867b89dd0
          path:
            src/application/binary/AnalysisProviderRegistry.ts
          sha256:
            5f85f4ec085ab7a794936fb2e21d57314d85eb9a25e86f68ec239f52fe769fe1
          url:
            https://github.com/morluto/rea/blob/5eaef92e5b3f9b15b23f2e4aea6a32a867b89dd0/src/application/binary/AnalysisProviderRegistry.ts
          local_snapshot_retained_not_published:
            True
        runtime_verified:
          False
    unknowns:
      - Installed release and current repository may expose different tools.
      - No new native or live application investigation was performed.
      - Synthetic installation evidence must not be attributed to target projects.
    related_projects:
      - P09-security-audit
      - P11-ego-lite
      - P19-universal-modder
    repository:
      morluto/rea
    revision:
      5eaef92e5b3f9b15b23f2e4aea6a32a867b89dd0
    url:
      https://github.com/morluto/rea
    source_file_count:
      9
    auxiliary_sources:

  - id:
      P16-magic
    name:
      21st.dev / Magic MCP compatibility package
    category:
      UI component service and MCP adapter
    sections:
      Identity correction:
        The relevant public repository is 21st-dev/magic-mcp, not 21st-dev/magic. Its current README says the former Magic server has been replaced by the unified 21st MCP service. The npm package remains as a compatibility proxy for older client configurations. The product's component catalogue and hosted generation service are not implemented in the small proxy file inspected here.
      Architecture and message flow:
        The proxy reads newline-delimited JSON-RPC messages from standard input, forwards them to an HTTP MCP endpoint and writes responses to standard output. Diagnostic output goes to standard error so it does not corrupt the protocol stream. The default endpoint is the hosted 21st service, with an environment override. An MCP session identifier returned during initialization is retained and sent on subsequent requests. The service, not this proxy, owns component search and generation behavior.
      Authentication and state:
        API key resolution accepts several historical argument forms and environment variables for compatibility. Authentication is resolved at process startup. A refused-authentication latch avoids repeatedly sending requests with a rejected key. A key change therefore needs a new process rather than assuming a running proxy rereads its environment. The public code demonstrates transport and credential-forwarding behavior; it does not establish the remote service's storage, retention or access-control implementation.
      What an agent gets:
        According to the current documentation, the service offers component discovery/retrieval and optional hosted generation. Account capabilities affect available tools and generation access. The actual live tools/list result is the authority for a connected account. The historical Magic aliases are described as server-side compatibility behavior. We did not authenticate, discover account-specific tools, generate components or inspect generated code.
      Deployment, license and boundaries:
        A client can connect directly to the HTTP MCP endpoint or use the stdio compatibility process when needed. The repository license is ISC. That license does not automatically cover every component, logo, template or hosted service output; those require their own attribution/usage review. An API wrapper being public source does not make the backend self-hostable. This is especially important when evaluating the difference between local generation and remotely supplied UI code.
      Next validation:
        Use a test account to inspect the current tool schema, retrieve one known component and trace every file/dependency it adds to a disposable project. Check behavior for expired credentials, session loss, unavailable generation capability and server errors. Validate accessibility, licensing and dependencies of the retrieved component separately from the success of the MCP transport. None of those runtime checks were performed in this pass.
    findings:
      - id:
          P16-magic:MA-01
        project_id:
          P16-magic
        evidence_kind:
          Documentation
        claim:
          Magic is now a compatibility package for unified 21st MCP.
        source:
          repository_id:
            P16-magic
          repository:
            21st-dev/magic-mcp
          revision:
            6b5299e8a83ceffa73d4fc4e148905bb3eeeeb55
          path:
            README.md
          sha256:
            3525241fe094188862f3bea44471d1581813cbef2edccce4a1051c0fcf7bc76f
          url:
            https://github.com/21st-dev/magic-mcp/blob/6b5299e8a83ceffa73d4fc4e148905bb3eeeeb55/README.md
          local_snapshot_retained_not_published:
            True
        runtime_verified:
          False
      - id:
          P16-magic:MA-02
        project_id:
          P16-magic
        evidence_kind:
          Code
        claim:
          One source entry implements stdio/HTTP forwarding, API-key resolution and session handling.
        source:
          repository_id:
            P16-magic
          repository:
            21st-dev/magic-mcp
          revision:
            6b5299e8a83ceffa73d4fc4e148905bb3eeeeb55
          path:
            src/index.ts
          sha256:
            710741258728da92b7f2d41cc26e255a4956a0329f25a6ea05786792efebd642
          url:
            https://github.com/21st-dev/magic-mcp/blob/6b5299e8a83ceffa73d4fc4e148905bb3eeeeb55/src/index.ts
          local_snapshot_retained_not_published:
            True
        runtime_verified:
          False
      - id:
          P16-magic:MA-03
        project_id:
          P16-magic
        evidence_kind:
          Package metadata
        claim:
          The package describes itself as a compatibility proxy.
        source:
          repository_id:
            P16-magic
          repository:
            21st-dev/magic-mcp
          revision:
            6b5299e8a83ceffa73d4fc4e148905bb3eeeeb55
          path:
            package.json
          sha256:
            4fbab118a91c4acaa567488da02bea47bf5555be761914705dde9ed3a0c34091
          url:
            https://github.com/21st-dev/magic-mcp/blob/6b5299e8a83ceffa73d4fc4e148905bb3eeeeb55/package.json
          local_snapshot_retained_not_published:
            True
        runtime_verified:
          False
      - id:
          P16-magic:MA-04
        project_id:
          P16-magic
        evidence_kind:
          License
        claim:
          Proxy source is ISC-licensed.
        source:
          repository_id:
            P16-magic
          repository:
            21st-dev/magic-mcp
          revision:
            6b5299e8a83ceffa73d4fc4e148905bb3eeeeb55
          path:
            LICENSE
          sha256:
            e9412a67f017b2651af15c086fa9af56f7fcb03849d220ad037dd626dc9729f2
          url:
            https://github.com/21st-dev/magic-mcp/blob/6b5299e8a83ceffa73d4fc4e148905bb3eeeeb55/LICENSE
          local_snapshot_retained_not_published:
            True
        runtime_verified:
          False
    unknowns:
      - Hosted catalogue and generation internals are unavailable in the inspected repository.
      - No live tools or output were tested.
      - Asset/component licenses are not inferred from proxy license.
    related_projects:
      - P10-skills
      - P17-photocraft
      - P18-compositor
    repository:
      21st-dev/magic-mcp
    revision:
      6b5299e8a83ceffa73d4fc4e148905bb3eeeeb55
    url:
      https://github.com/21st-dev/magic-mcp
    source_file_count:
      4
    auxiliary_sources:

  - id:
      P17-photocraft
    name:
      PhotoCraft
    category:
      Headless-capable image editor and rendering engine
    sections:
      What it is:
        PhotoCraft is a Rust image editor with a reusable engine, desktop/CLI/web frontends and automation surfaces. Its architecture is unusually explicit about separating the editor model, commands, image algorithms, rendering, file formats and interfaces. The architecture document distinguishes a current-state summary from an earlier plan; the plan must not be treated as an inventory of completed features. In particular, that current summary says the planned ML crate is not built.
      Architecture:
        The workspace divides document/raster/color geometry, algorithms, composition, GPU rendering, file I/O, engine and UI responsibilities into crates. Engine commands have stable identifiers and typed serializable parameters. The architecture describes a shared command path used by menu/UI, CLI, control channel and MCP. CPU rendering is documented as a reference for selected GPU operations. These claims are partly architectural documentation, corroborated here by the engine/document crate surfaces and automation module boundaries; the whole command catalogue and renderer were not audited.
      Automation flow:
        An automation client reaches a headless backend or a bridge to a running app. The automation crate exposes RPC, server, file handling, budgets, security and workspace modules. The server maps tool requests to engine operations. Filesystem access is mediated through AuthorizedWorkspace, which holds separate read and write directory capabilities. Missing authority fails closed. Request paths are treated as untrusted and resolved beneath directory handles. This is more specific than simply giving a model a path string and assuming it stays inside a folder.
      State, files and security:
        The native format is documented as a .pcraft document with a manifest and image/tile content. Snapshots and history support editing/undo, while file adapters translate external formats. The inspected automation security module bounds JSON request size, simultaneous TCP connections, batch length and I/O timeouts. It requires authentication as the first TCP request and imposes a separate authentication deadline. Tokens are generated from OS randomness and compared without an early mismatch exit. These are concrete local-control mechanisms, not a full security certification.
      Deployment and extension:
        The documented desktop uses egui/eframe with wgpu; browser builds use WebAssembly. Headless CLI and MCP avoid forcing every automation through screen coordinates. Extending a command, a format adapter or a renderer is different from changing the frontend. The Cargo workspace declares MIT OR Apache-2.0 and carries both license texts; optional libraries, model plans and brand assets need separate checks. We did not build Rust targets, launch the application or measure output parity.
      Limitations and next tests:
        Do not equate an extensive command list with Photoshop parity. Verify one command through UI, CLI and MCP using the same small image and compare output pixels, document state and undo behavior. Test denied paths, malformed control frames, authentication timeouts and interrupted saves in a controlled environment. Import/export fidelity, color management, large-file memory and GPU/CPU agreement each need independent fixtures. Planned AI/ML capabilities remain distinct from present deterministic editing tools.
    findings:
      - id:
          P17-photocraft:PC-01
        project_id:
          P17-photocraft
        evidence_kind:
          Documentation
        claim:
          Current architecture summary distinguishes implemented crates from an older plan.
        source:
          repository_id:
            P17-photocraft
          repository:
            storytold/photocraft
          revision:
            2a952f164c0b4cf936b1c6497db10dd095341c00
          path:
            docs/architecture.md
          sha256:
            4df98c9d8ffe35b39019b897290d3a544be7a1696ec148bd8e1f2328bece6776
          url:
            https://github.com/storytold/photocraft/blob/2a952f164c0b4cf936b1c6497db10dd095341c00/docs/architecture.md
          local_snapshot_retained_not_published:
            True
        runtime_verified:
          False
      - id:
          P17-photocraft:PC-02
        project_id:
          P17-photocraft
        evidence_kind:
          Code
        claim:
          Automation exposes headless/bridge, server, file, workspace and security modules.
        source:
          repository_id:
            P17-photocraft
          repository:
            storytold/photocraft
          revision:
            2a952f164c0b4cf936b1c6497db10dd095341c00
          path:
            crates/automation/src/lib.rs
          sha256:
            5ee25d1fa4585a7715b961beeb233638d3345e51e3d984d9438ea59e3f368219
          url:
            https://github.com/storytold/photocraft/blob/2a952f164c0b4cf936b1c6497db10dd095341c00/crates/automation/src/lib.rs
          local_snapshot_retained_not_published:
            True
        runtime_verified:
          False
      - id:
          P17-photocraft:PC-03
        project_id:
          P17-photocraft
        evidence_kind:
          Code
        claim:
          Local control transport has authentication and explicit resource limits.
        source:
          repository_id:
            P17-photocraft
          repository:
            storytold/photocraft
          revision:
            2a952f164c0b4cf936b1c6497db10dd095341c00
          path:
            crates/automation/src/security.rs
          sha256:
            0b673135d4f87a1a56214f49c6ab42b2d0c3580bf05b1905cd301c8e6a4ec633
          url:
            https://github.com/storytold/photocraft/blob/2a952f164c0b4cf936b1c6497db10dd095341c00/crates/automation/src/security.rs
          local_snapshot_retained_not_published:
            True
        runtime_verified:
          False
      - id:
          P17-photocraft:PC-04
        project_id:
          P17-photocraft
        evidence_kind:
          Code
        claim:
          Filesystem operations use separate read/write directory capabilities.
        source:
          repository_id:
            P17-photocraft
          repository:
            storytold/photocraft
          revision:
            2a952f164c0b4cf936b1c6497db10dd095341c00
          path:
            crates/automation/src/workspace.rs
          sha256:
            ec61be042eae08544232521363954f3c44e399cce59f3d69e2b73f1cebba904f
          url:
            https://github.com/storytold/photocraft/blob/2a952f164c0b4cf936b1c6497db10dd095341c00/crates/automation/src/workspace.rs
          local_snapshot_retained_not_published:
            True
        runtime_verified:
          False
      - id:
          P17-photocraft:PC-05
        project_id:
          P17-photocraft
        evidence_kind:
          Code
        claim:
          Engine is a separate crate from UI and automation.
        source:
          repository_id:
            P17-photocraft
          repository:
            storytold/photocraft
          revision:
            2a952f164c0b4cf936b1c6497db10dd095341c00
          path:
            crates/engine/src/lib.rs
          sha256:
            3eadcfc60060f7bac3b9d1dac705f08c8cb2db89ada869a5db94e3cf241997d2
          url:
            https://github.com/storytold/photocraft/blob/2a952f164c0b4cf936b1c6497db10dd095341c00/crates/engine/src/lib.rs
          local_snapshot_retained_not_published:
            True
        runtime_verified:
          False
      - id:
          P17-photocraft:PC-06
        project_id:
          P17-photocraft
        evidence_kind:
          Package metadata
        claim:
          Workspace declares dual MIT OR Apache-2.0 licensing.
        source:
          repository_id:
            P17-photocraft
          repository:
            storytold/photocraft
          revision:
            2a952f164c0b4cf936b1c6497db10dd095341c00
          path:
            Cargo.toml
          sha256:
            9178c498e34055ba91a855e9dc2190c6fe51f9ad8fdb1246c89bc1cf38d4b230
          url:
            https://github.com/storytold/photocraft/blob/2a952f164c0b4cf936b1c6497db10dd095341c00/Cargo.toml
          local_snapshot_retained_not_published:
            True
        runtime_verified:
          False
    unknowns:
      - No editor or renderer execution, build or parity benchmark.
      - Full command catalogue and format fidelity are not validated.
      - Planned ML crate is not counted as an existing capability.
    related_projects:
      - P18-compositor
      - P16-magic
    repository:
      storytold/photocraft
    revision:
      2a952f164c0b4cf936b1c6497db10dd095341c00
    url:
      https://github.com/storytold/photocraft
    source_file_count:
      12
    auxiliary_sources:

  - id:
      P18-compositor
    name:
      Compositor
    category:
      Native image editor with file-based automation
    sections:
      What it is:
        Compositor is a native macOS image editor organized around layered compositing, adjustments and post-processing. The inspected project is Swift/Xcode based. Its agent integration is particularly concrete: another program can write the editor's document package, and the open app can observe those changes. That mechanism differs from an agent remotely clicking every GUI control and from a standalone hosted image-generation service.
      Architecture and interaction flow:
        EditorSession coordinates editing state and project interaction; document-history code manages undo/history. ProjectStore serializes and loads document packages. ProjectController's external-change path watches for changes, reloads suitable updates and handles conflict with unsaved user edits. Rendering modules are separate in the repository, although detailed GPU algorithms were not inspected here. An automated file write and a successful application reload are two events that need separate verification.
      File contract and persistence:
        A .comp package contains a JSON manifest plus referenced image data. Layer identifiers, ordering, transforms, blend modes, masks and document identity form the contract. The writer guide says to place image files first and then atomically replace the manifest; it also explains that reloading clears undo and that unsaved user work needs a choice rather than silent replacement. ProjectStore validates format/version, dimensions, layer structure and referenced images before accepting a document, and saves the package through coordinated atomic replacement.
      Documentation versus current code:
        The writer guide gives an 8-bit PNG-oriented external-writing contract. The selected ProjectStore code additionally accepts version-gated higher-depth/HDR cases, including 16-bit image handling and OpenEXR for newer format versions. Therefore the simple guide is not a complete specification of every current saved document. An external writer should choose and validate a supported subset rather than assuming the guide's examples cover all internal possibilities. The guide also documents a change-detection caveat for an image rewritten to exactly the same byte size without a manifest change.
      Authority and deployment:
        The automation boundary is local filesystem access to the selected project package. Any program allowed to write that package can affect its content; this is not a user/tenant authorization service. Package validation protects file interpretation but does not authenticate the identity of the writer. The README currently requires recent macOS/Xcode and Apple silicon. Those platform requirements are documented, not tested on this machine. Root code is MIT; bundled dependencies and release-signing infrastructure are separate.
      Follow-up experiments:
        Create a disposable document, change a layer through the package format, and verify the live reload while preserving the document ID. Test a missing image, invalid layer graph, same-size replacement, unsaved user edit, interrupted save and a stale writer overwriting a newer version. Compare exported pixels with the live canvas. Validate version handling for higher-depth images before adopting assumptions from the simplified guide. No application was installed or launched here.
    findings:
      - id:
          P18-compositor:CO-01
        project_id:
          P18-compositor
        evidence_kind:
          Code
        claim:
          EditorSession and history maintain interactive document state.
        source:
          repository_id:
            P18-compositor
          repository:
            robbietilton/Compositor
          revision:
            365b5745eda537f984f3d5bed1e53c361dbc9c91
          path:
            Compositor/Document/EditorSession.swift
          sha256:
            8bf8a3ed657d4df0f745b31c55710bf7f1e701df507ebc432f389dedb56af5a7
          url:
            https://github.com/robbietilton/Compositor/blob/365b5745eda537f984f3d5bed1e53c361dbc9c91/Compositor/Document/EditorSession.swift
          local_snapshot_retained_not_published:
            True
        runtime_verified:
          False
      - id:
          P18-compositor:CO-02
        project_id:
          P18-compositor
        evidence_kind:
          Code
        claim:
          ProjectStore validates and atomically saves versioned packages.
        source:
          repository_id:
            P18-compositor
          repository:
            robbietilton/Compositor
          revision:
            365b5745eda537f984f3d5bed1e53c361dbc9c91
          path:
            Compositor/IO/ProjectStore.swift
          sha256:
            8dbae5331fb3ffc188a7a7c630f05f3de86e64c9fc3854e1f4b368f7e8f6cc1a
          url:
            https://github.com/robbietilton/Compositor/blob/365b5745eda537f984f3d5bed1e53c361dbc9c91/Compositor/IO/ProjectStore.swift
          local_snapshot_retained_not_published:
            True
        runtime_verified:
          False
      - id:
          P18-compositor:CO-03
        project_id:
          P18-compositor
        evidence_kind:
          Code
        claim:
          External file changes are handled separately from user editing.
        source:
          repository_id:
            P18-compositor
          repository:
            robbietilton/Compositor
          revision:
            365b5745eda537f984f3d5bed1e53c361dbc9c91
          path:
            Compositor/IO/ProjectController+ExternalChanges.swift
          sha256:
            a8b0ca6fe0ee5992e20be7fbf857587284b1dbdb3f2bb76380fb04f7d93e41b9
          url:
            https://github.com/robbietilton/Compositor/blob/365b5745eda537f984f3d5bed1e53c361dbc9c91/Compositor/IO/ProjectController+ExternalChanges.swift
          local_snapshot_retained_not_published:
            True
        runtime_verified:
          False
      - id:
          P18-compositor:CO-04
        project_id:
          P18-compositor
        evidence_kind:
          Documentation
        claim:
          External writers use images plus manifest, with reload/conflict caveats.
        source:
          repository_id:
            P18-compositor
          repository:
            robbietilton/Compositor
          revision:
            365b5745eda537f984f3d5bed1e53c361dbc9c91
          path:
            docs/writing-comp-files.md
          sha256:
            423089b08e333895f992956526b91a83d49a1839a88a25582eafbed71db3ada5
          url:
            https://github.com/robbietilton/Compositor/blob/365b5745eda537f984f3d5bed1e53c361dbc9c91/docs/writing-comp-files.md
          local_snapshot_retained_not_published:
            True
        runtime_verified:
          False
      - id:
          P18-compositor:CO-05
        project_id:
          P18-compositor
        evidence_kind:
          Code
        claim:
          History is an explicit document subsystem.
        source:
          repository_id:
            P18-compositor
          repository:
            robbietilton/Compositor
          revision:
            365b5745eda537f984f3d5bed1e53c361dbc9c91
          path:
            Compositor/Document/DocumentHistory.swift
          sha256:
            fdf9c93093afd567da7f31380205cd28ed089b0be205a4477befffb80005d36c
          url:
            https://github.com/robbietilton/Compositor/blob/365b5745eda537f984f3d5bed1e53c361dbc9c91/Compositor/Document/DocumentHistory.swift
          local_snapshot_retained_not_published:
            True
        runtime_verified:
          False
    unknowns:
      - No live reload or image-fidelity test.
      - The external writer guide is narrower than the current internal format.
      - No audit of every file-decoding or rendering path.
    related_projects:
      - P17-photocraft
      - P16-magic
    repository:
      robbietilton/Compositor
    revision:
      365b5745eda537f984f3d5bed1e53c361dbc9c91
    url:
      https://github.com/robbietilton/Compositor
    source_file_count:
      8
    auxiliary_sources:

  - id:
      P19-universal-modder
    name:
      Universal Modder
    category:
      Domain workflow skills and local CLI
    sections:
      What it is:
        Universal Modder packages game-modding procedures, a Python command-line toolbox and a growing knowledge base. It is designed for an existing coding assistant to operate, not a standalone autonomous model runtime. Engine-specific procedures describe different routes through inspection, asset work, code changes and verification. The word universal should not be read as proof that every game or engine is supported automatically.
      Workflow and executable parts:
        The documented sequence starts with knowledge lookup and reconnaissance, chooses a suitable engine route, makes a backup, performs a small change, verifies it in the game, and records or packages the result. The um CLI registers modules for scanning, assets, video, Windows integration, backups, publishing and knowledge. That is a concrete command surface beneath the natural-language skills. A skill explains when to call a tool; the Python implementation determines what actually happens. Publishing is an explicit capability and was not invoked here.
      Knowledge retrieval and persistence:
        The knowledge module prefers an explicit path or UM_KB setting, then a nearby repository knowledge directory, then a cached upstream copy. Its remote sync downloads Markdown/JSON knowledge files into a temporary directory and replaces the cache. A timestamp drives refresh eligibility. Search and note validation operate over structured notes rather than an inspected vector database. The remote path follows the configured branch, so the knowledge visible during a later run may differ from the knowledge captured in this dossier's pinned snapshot.
      Backup and recovery behavior:
        The selected backup implementation produces ZIP archives and file manifests containing sizes and SHA-1 digests. It uses exclusive archive creation, a size ceiling and cleanup of a partially created archive after a failure. Restore first snapshots current state; confirmation and optional cleanup behavior are explicit CLI choices. These mechanisms establish intended recovery steps, not that every application can be restored consistently while running. The archive parser, every path traversal edge case and cross-platform permissions were not comprehensively audited.
      Credentials and external services:
        The fal integration can call a hosted asset service. Its key lookup prefers an environment variable, then an explicitly named file when configured, then the desktop keyring, a fallback plaintext file and dotenv files. The file writer attempts owner-only POSIX permissions and explicitly notes that those mode bits do not enforce Windows ACLs. The knowledge service and asset-generation service are separate network dependencies. Local ComfyUI is another documented asset route. No credential store was opened or changed during this review.
      Deployment and extension:
        The documented toolchain uses Python, Git and media utilities, with additional programs such as Blender for particular work. Adding a route can mean writing a knowledge note or skill, implementing a CLI module, or supporting a new engine-specific extraction/repacking workflow. Root code is MIT; game content, generated assets and external services need their own rights and terms considered separately. Those are distinct from the repository's code license.
      Unverified behavior:
        A later controlled test should use an owned disposable sample: scan it, create a backup, make a reversible edit, restore it and compare files. Test stale knowledge, network failure during cache replacement, oversized archives, paths outside the intended workspace and a failed asset request. No game was installed or modified and no assets were generated. The inspected design supports a procedural domain toolkit; it does not establish unattended success across games.
    findings:
      - id:
          P19-universal-modder:UM-01
        project_id:
          P19-universal-modder
        evidence_kind:
          Code
        claim:
          CLI groups dispatch to domain tool modules.
        source:
          repository_id:
            P19-universal-modder
          repository:
            rehan-remade/universal-modder
          revision:
            23902ef42e8ea9b077bfbbf6911eb8ea0348e55a
          path:
            um/cli.py
          sha256:
            4a2e6dd8d0f22a090e8b8302bb6a013af507baa69d0232fc3146b6de884fe35d
          url:
            https://github.com/rehan-remade/universal-modder/blob/23902ef42e8ea9b077bfbbf6911eb8ea0348e55a/um/cli.py
          local_snapshot_retained_not_published:
            True
        runtime_verified:
          False
      - id:
          P19-universal-modder:UM-02
        project_id:
          P19-universal-modder
        evidence_kind:
          Code
        claim:
          Knowledge resolves local/configured/cache roots and refreshes remote files.
        source:
          repository_id:
            P19-universal-modder
          repository:
            rehan-remade/universal-modder
          revision:
            23902ef42e8ea9b077bfbbf6911eb8ea0348e55a
          path:
            um/kb.py
          sha256:
            32a5e4fc95dcd67805417e6657dc2671e15aadfcca59c848d114b16e4475531c
          url:
            https://github.com/rehan-remade/universal-modder/blob/23902ef42e8ea9b077bfbbf6911eb8ea0348e55a/um/kb.py
          local_snapshot_retained_not_published:
            True
        runtime_verified:
          False
      - id:
          P19-universal-modder:UM-03
        project_id:
          P19-universal-modder
        evidence_kind:
          Code
        claim:
          Backup and restore have explicit manifest and confirmation paths.
        source:
          repository_id:
            P19-universal-modder
          repository:
            rehan-remade/universal-modder
          revision:
            23902ef42e8ea9b077bfbbf6911eb8ea0348e55a
          path:
            um/backup.py
          sha256:
            cf6840664d4de32a303973602e3072e44312baf7821e0e1c1c3bd8a2c3273ab5
          url:
            https://github.com/rehan-remade/universal-modder/blob/23902ef42e8ea9b077bfbbf6911eb8ea0348e55a/um/backup.py
          local_snapshot_retained_not_published:
            True
        runtime_verified:
          False
      - id:
          P19-universal-modder:UM-04
        project_id:
          P19-universal-modder
        evidence_kind:
          Code
        claim:
          Asset-service key lookup has explicit precedence and storage fallbacks.
        source:
          repository_id:
            P19-universal-modder
          repository:
            rehan-remade/universal-modder
          revision:
            23902ef42e8ea9b077bfbbf6911eb8ea0348e55a
          path:
            um/fal.py
          sha256:
            99e970233f74ed9dfb10b01a9bec6fbed959f0e66dfeeee40cd2e5f9e4c3be09
          url:
            https://github.com/rehan-remade/universal-modder/blob/23902ef42e8ea9b077bfbbf6911eb8ea0348e55a/um/fal.py
          local_snapshot_retained_not_published:
            True
        runtime_verified:
          False
      - id:
          P19-universal-modder:UM-05
        project_id:
          P19-universal-modder
        evidence_kind:
          Documentation
        claim:
          Engine workflows coordinate knowledge, tools and verification.
        source:
          repository_id:
            P19-universal-modder
          repository:
            rehan-remade/universal-modder
          revision:
            23902ef42e8ea9b077bfbbf6911eb8ea0348e55a
          path:
            README.md
          sha256:
            806936373af53c21373473cd7883a1ffaa0690fbaffceb7c0b15e773df6494b1
          url:
            https://github.com/rehan-remade/universal-modder/blob/23902ef42e8ea9b077bfbbf6911eb8ea0348e55a/README.md
          local_snapshot_retained_not_published:
            True
        runtime_verified:
          False
    unknowns:
      - No game-modification or restore test.
      - Knowledge downloaded at runtime can move beyond the pinned revision.
      - Individual engine routes and archive safety need further review.
    related_projects:
      - P10-skills
      - P17-photocraft
      - P15-rea
    repository:
      rehan-remade/universal-modder
    revision:
      23902ef42e8ea9b077bfbbf6911eb8ea0348e55a
    url:
      https://github.com/rehan-remade/universal-modder
    source_file_count:
      10
    auxiliary_sources:

  - id:
      P20-slopmonster
    name:
      SlopMonster
    category:
      Prose linting and optional model rewrite
    sections:
      What it is:
        SlopMonster is a text-quality toolkit with a deterministic prose linter and an optional rewrite workflow using an installed model CLI. Its central value is an explicit set of editorial patterns that can be inspected and rerun. It is not an AI-authorship detector, a fact checker or a proof that a piece of writing is good. A clean result means the configured rules did not flag the normalized input.
      Input-to-report flow:
        The deslop Python script accepts text and normalizes supported document forms before applying pattern checks. Its HTML path removes markup, including script/style content, without rendering a page or evaluating CSS. Its Markdown handling removes selected non-prose structures such as code and image syntax. It then checks vocabulary, phrases, punctuation, rhythm and conversion/social-proof patterns. The scoring logic starts from five and deducts for categories with findings, rather than interpreting each match as a calibrated probability.
      Output and failure semantics:
        The tool produces a report useful to a person or another coding assistant. Empty input is a failure case, and a score below the clean threshold can produce a failing exit status for automation. This makes a lint gate possible, but also creates false-positive and coverage questions. For example, domain terminology, quoted text and writing in another language may not fit the rules. Stripping markup can change what the analyzer sees relative to what a reader sees on a rendered page.
      Optional rewrite path:
        The cleanse shell script delegates rewriting to an available model CLI from a different family according to its routing rules. It includes timeout handling and distinct failures for unavailable clients. The expected response separates rewritten body from notes using a sentinel. If that sentinel is absent, the script can warn and retain broader output. This is an output-format convention dependent on another program and model, not a structured-response guarantee enforced by the Python linter.
      State, authority and dependencies:
        The linting path can operate over local text without an external model. Rewriting inherits the installed CLI's authentication, data handling, available permissions and potential usage costs. A read-only option in one client invocation does not establish a universal sandbox for all supported clients. There is no inspected durable workflow database or enterprise authorization service. Root material is MIT; model-provider access and CLI versions remain separate dependencies.
      Extension and verification:
        Rules can be extended in the Python implementation and checked against examples, while the rewrite prompt/routing can be changed separately. The repository includes a test file, but target tests were not executed in this investigation. A useful validation set would pair acceptable prose with intentionally flagged prose, include citations/code/HTML, and compare rewrite factual preservation sentence by sentence. A higher lint score must not be used as a substitute for that editorial review.
    findings:
      - id:
          P20-slopmonster:SL-01
        project_id:
          P20-slopmonster
        evidence_kind:
          Code
        claim:
          The linter normalizes input and scores explicit rule categories.
        source:
          repository_id:
            P20-slopmonster
          repository:
            ItsssssJack/SlopMonster
          revision:
            3fc9787d9337b57c599a80afbefbbb3be5a8eb0b
          path:
            tools/deslop.py
          sha256:
            d31fd8c9b7013bd857c38afa53b59aa734a9cf96e5026ff69921e43537a9fd5a
          url:
            https://github.com/ItsssssJack/SlopMonster/blob/3fc9787d9337b57c599a80afbefbbb3be5a8eb0b/tools/deslop.py
          local_snapshot_retained_not_published:
            True
        runtime_verified:
          False
      - id:
          P20-slopmonster:SL-02
        project_id:
          P20-slopmonster
        evidence_kind:
          Code
        claim:
          Optional cleansing invokes installed model CLIs with timeout/output handling.
        source:
          repository_id:
            P20-slopmonster
          repository:
            ItsssssJack/SlopMonster
          revision:
            3fc9787d9337b57c599a80afbefbbb3be5a8eb0b
          path:
            tools/cleanse.sh
          sha256:
            6d26e9d8f4d80af640dd0485b63efe83edd87e62815c001d5e0f5d36cf82fe37
          url:
            https://github.com/ItsssssJack/SlopMonster/blob/3fc9787d9337b57c599a80afbefbbb3be5a8eb0b/tools/cleanse.sh
          local_snapshot_retained_not_published:
            True
        runtime_verified:
          False
      - id:
          P20-slopmonster:SL-03
        project_id:
          P20-slopmonster
        evidence_kind:
          Code
        claim:
          A target test file exists; it was read, not executed.
        source:
          repository_id:
            P20-slopmonster
          repository:
            ItsssssJack/SlopMonster
          revision:
            3fc9787d9337b57c599a80afbefbbb3be5a8eb0b
          path:
            tools/test_deslop.py
          sha256:
            b54be86a87ece908ea9b4ca9a79b15f034bcb083a2d2f4d775a25c855fd12733
          url:
            https://github.com/ItsssssJack/SlopMonster/blob/3fc9787d9337b57c599a80afbefbbb3be5a8eb0b/tools/test_deslop.py
          local_snapshot_retained_not_published:
            True
        runtime_verified:
          False
      - id:
          P20-slopmonster:SL-04
        project_id:
          P20-slopmonster
        evidence_kind:
          Documentation
        claim:
          The project positions its rules as prose cleanup.
        source:
          repository_id:
            P20-slopmonster
          repository:
            ItsssssJack/SlopMonster
          revision:
            3fc9787d9337b57c599a80afbefbbb3be5a8eb0b
          path:
            README.md
          sha256:
            caf08e593e17dcad4ac7fc1a566940c1537c34c48d7b8bdc7216da8cf2fd3ec5
          url:
            https://github.com/ItsssssJack/SlopMonster/blob/3fc9787d9337b57c599a80afbefbbb3be5a8eb0b/README.md
          local_snapshot_retained_not_published:
            True
        runtime_verified:
          False
    unknowns:
      - No rewrite was requested from a model.
      - No measured false-positive rate or language coverage.
      - A clean score does not establish factual accuracy or authorship.
    related_projects:
      - P10-skills
      - P13-arena
    repository:
      ItsssssJack/SlopMonster
    revision:
      3fc9787d9337b57c599a80afbefbbb3be5a8eb0b
    url:
      https://github.com/ItsssssJack/SlopMonster
    source_file_count:
      5
    auxiliary_sources:

  - id:
      P21-openhands
    name:
      OpenHands / Agent Canvas
    category:
      Agent interface and separate execution SDK
    sections:
      Project identity at this revision:
        The pinned OpenHands main repository presents Agent Canvas: a React/TypeScript interface for conversations, files, terminals, browser views and automation. Older descriptions of OpenHands as a single Python coding-agent repository are insufficient for this revision. The execution machinery belongs to separate Agent Server/SDK components. This dossier therefore captures the main UI repository and selected files from OpenHands/software-agent-sdk as two independently pinned sources.
      Architecture and interaction flow:
        Canvas selects a backend, connects to its API, creates or attaches to a conversation and renders events and workspace views. The Agent Server owns execution and conversation lifecycle. In the selected conversation service, a request resolves agent settings and a launch source, scopes supplied secrets, registers tool definitions, optionally plans a worktree and constructs the launched agent/workspace. Client-defined JSON tool schemas are distinct from importing Python tool modules. Plugins are described as loading lazily when the conversation first runs. The automation service is another component; its complete implementation was not inspected.
      State and persistence:
        Canvas stores backend definitions in browser localStorage and keeps the active selection primarily tab-scoped in sessionStorage, with a local fallback. The backend object includes its API-key field, so browser-origin security is relevant to that storage design. ConversationService maintains conversation lifecycle and persisted event access separately from the UI. Its presence does not by itself prove that every external command can be resumed without duplication. Git worktrees separate checkout state, while execution isolation depends on how the server and runtime are actually launched.
      Authentication and trust boundaries:
        The inspected UI auth helper uses X-Session-API-Key for local backends and bearer authentication for applicable cloud configurations; cookie mode is handled separately. The SDK dependency checks session keys against configuration, and its selected check bypasses that requirement when no keys are configured. That observation is limited to this function, not a conclusion about every route or deployment. Backend address, allowed origins, browser storage, server credentials and runtime/container permissions form distinct boundaries.
      Deployment and extension:
        Self-hosting documentation describes local operation and alternative runtime configurations, including per-conversation Docker execution. Binding a server beyond loopback changes exposure, and containers do not automatically protect all host-side automation or shared workspace state. Extension points include tools, agent launch configuration, plugins/skills and backend integration. Main and SDK root licenses are MIT at the recorded revisions; deployment services and dependencies must be checked separately. No OpenHands containers, servers or agents were started here.
      What the source establishes and leaves open:
        The code establishes a separation between interface, server lifecycle and execution workspace, plus concrete client-side auth and persistence choices. It does not establish a fully audited multi-tenant system, safe arbitrary tool imports or universal recovery semantics. A controlled follow-up should create a conversation on a disposable backend, disconnect/reconnect the UI, interrupt execution, rotate a session key and compare worktree versus container boundaries. Verify host mounts and secret propagation before interpreting a Docker option as complete isolation.
    findings:
      - id:
          P21-openhands:OH-01
        project_id:
          P21-openhands
        evidence_kind:
          Documentation
        claim:
          The current main repository separates Canvas from execution services.
        source:
          repository_id:
            P21-openhands
          repository:
            OpenHands/OpenHands
          revision:
            950ee95fda862dd8b12e741698e43ca4fc4fa6ac
          path:
            docs/architecture.md
          sha256:
            9f806944e4b13f4cc714da3f86f335b5f5bfcdeb49b9cf68ccaced2aaff3f84c
          url:
            https://github.com/OpenHands/OpenHands/blob/950ee95fda862dd8b12e741698e43ca4fc4fa6ac/docs/architecture.md
          local_snapshot_retained_not_published:
            True
        runtime_verified:
          False
      - id:
          P21-openhands:OH-02
        project_id:
          P21-openhands
        evidence_kind:
          Code
        claim:
          Backend auth selects local-key, bearer or cookie behavior.
        source:
          repository_id:
            P21-openhands
          repository:
            OpenHands/OpenHands
          revision:
            950ee95fda862dd8b12e741698e43ca4fc4fa6ac
          path:
            src/api/backend-registry/auth.ts
          sha256:
            6c0febb4b68bfd3621e6f5d7b3580bcbd9f562ce76ce282bbf19f6fbcd079658
          url:
            https://github.com/OpenHands/OpenHands/blob/950ee95fda862dd8b12e741698e43ca4fc4fa6ac/src/api/backend-registry/auth.ts
          local_snapshot_retained_not_published:
            True
        runtime_verified:
          False
      - id:
          P21-openhands:OH-03
        project_id:
          P21-openhands
        evidence_kind:
          Code
        claim:
          Backend definitions and active selections use browser storage.
        source:
          repository_id:
            P21-openhands
          repository:
            OpenHands/OpenHands
          revision:
            950ee95fda862dd8b12e741698e43ca4fc4fa6ac
          path:
            src/api/backend-registry/storage.ts
          sha256:
            18d9af687fba65b66a865045a93ba35db86e0ba8a60533a0d63a60180830b395
          url:
            https://github.com/OpenHands/OpenHands/blob/950ee95fda862dd8b12e741698e43ca4fc4fa6ac/src/api/backend-registry/storage.ts
          local_snapshot_retained_not_published:
            True
        runtime_verified:
          False
      - id:
          P21-openhands:OH-04
        project_id:
          P21-openhands
        evidence_kind:
          Code
        claim:
          Conversation creation resolves launch state, tools, secrets and workspaces.
        source:
          repository_id:
            P21-openhands-sdk
          repository:
            OpenHands/software-agent-sdk
          revision:
            6530325e9dd0ea1b6b4f1994d7dab52764cfc3f1
          path:
            openhands-agent-server/openhands/agent_server/conversation_service.py
          sha256:
            100a7cfea87dc28730549581d23a08a27fb85e887f8781b79f6d5cf412d13c03
          url:
            https://github.com/OpenHands/software-agent-sdk/blob/6530325e9dd0ea1b6b4f1994d7dab52764cfc3f1/openhands-agent-server/openhands/agent_server/conversation_service.py
          local_snapshot_retained_not_published:
            True
        runtime_verified:
          False
      - id:
          P21-openhands:OH-05
        project_id:
          P21-openhands
        evidence_kind:
          Code
        claim:
          Configured session-key validation is a server dependency.
        source:
          repository_id:
            P21-openhands-sdk
          repository:
            OpenHands/software-agent-sdk
          revision:
            6530325e9dd0ea1b6b4f1994d7dab52764cfc3f1
          path:
            openhands-agent-server/openhands/agent_server/dependencies.py
          sha256:
            2bf1483569a3837365c4a1f332de3cf707cf9afd21c46686d64c5f008ccace3f
          url:
            https://github.com/OpenHands/software-agent-sdk/blob/6530325e9dd0ea1b6b4f1994d7dab52764cfc3f1/openhands-agent-server/openhands/agent_server/dependencies.py
          local_snapshot_retained_not_published:
            True
        runtime_verified:
          False
      - id:
          P21-openhands:OH-06
        project_id:
          P21-openhands
        evidence_kind:
          Code
        claim:
          Docker provisioning is a separate runtime subsystem.
        source:
          repository_id:
            P21-openhands-sdk
          repository:
            OpenHands/software-agent-sdk
          revision:
            6530325e9dd0ea1b6b4f1994d7dab52764cfc3f1
          path:
            openhands-agent-server/openhands/agent_server/docker_runtime/provisioning.py
          sha256:
            ace1d23164a846da5b0f59f16a7bd4cd5cb270404d418874ad12322c3ecdaae0
          url:
            https://github.com/OpenHands/software-agent-sdk/blob/6530325e9dd0ea1b6b4f1994d7dab52764cfc3f1/openhands-agent-server/openhands/agent_server/docker_runtime/provisioning.py
          local_snapshot_retained_not_published:
            True
        runtime_verified:
          False
    unknowns:
      - No runtime, reconnect or container-boundary test.
      - Automation service is not comprehensively inspected.
      - Main repository and execution SDK evolve independently.
    related_projects:
      - P01-hermes
      - P14-orca
      - P08-letta
    repository:
      OpenHands/OpenHands
    revision:
      950ee95fda862dd8b12e741698e43ca4fc4fa6ac
    url:
      https://github.com/OpenHands/OpenHands
    source_file_count:
      7
    auxiliary_sources:
      - repository:
          OpenHands/software-agent-sdk
        revision:
          6530325e9dd0ea1b6b4f1994d7dab52764cfc3f1
        url:
          https://github.com/OpenHands/software-agent-sdk
baseline_evidence:
  - id:
      T01
    label:
      Known-answer composite
    value:
      24 / 24
    status:
      demonstrated
    detail:
      S2 combines 9 + 15 returned answers on known questions. Stopped batch runs remain failed. This is not a clean single production run or a generalised accuracy rate.
    source:
      E01
  - id:
      T02
    label:
      Latest fresh-intake answers
    value:
      0 / 3
    status:
      partial
    detail:
      AUTO-INTAKE RUN03: ten calls completed, but par 20 and CC-224 were missed. One answer had a material error; the other two had strict gaps. Latest output was CLI, not app.
    source:
      E01
  - id:
      T03
    label:
      Citation replay
    value:
      2 / 2
    status:
      demonstrated
    detail:
      Two known answers were strict-clean; 16/16 supporting native citations. $1.126136 total and 65.5 / 85.6 seconds. Tiny sample; not a latency or cost service guarantee.
    source:
      E01
  - id:
      T04
    label:
      Context packet
    value:
      108.7 KB
    status:
      partial
    detail:
      Approximately 108.7 of a 120 KB packet budget. Evidence selection and growing-history tests are needed before scaling the history.
    source:
      E01
  - id:
      T05
    label:
      Replay & correction behaviour
    value:
      Narrow pass
    status:
      demonstrated
    detail:
      Accept / reject / correct and restart behaviour reported. Undated movement handling, identity authority, duplicates and ordering required fixes. No independent rerun here.
    source:
      E01
  - id:
      T06
    label:
      Live connectors
    value:
      Reported
    status:
      reported
    detail:
      WhatsApp online-session reading is founder-reported. Gmail is described as straightforward. Neither completeness nor recovery was independently verified.
    source:
      E02
baseline_components:
  - id:
      owner-app
    name:
      Owner & operator workspace
    layer:
      experience
    status:
      partial
    purpose:
      Give the owner one place to understand the business and resolve uncertainty. Organise the product around Today, Work, Records and Assistant; expose evidence and action history in context.
    inputs:
      - Authenticated identity and workspace scope
      - Fresh business views, tasks, proposals and source links
    outputs:
      - Questions, corrections and explicit decisions
      - Visible task state, source freshness and action receipts
    dependencies:
      - identity
      - views
      - decision-queue
      - answers
    evidence:
      The dossier reports an offline replay app with pending-record acceptance, rejection and correction, including restart checks. Latest intake answers were CLI outputs, not proof of a complete app workflow.
    remaining:
      - Connect the app to fresh ingestion and persisted services
      - Show connection gaps, unresolved facts, decision impact and last sync
      - Support accessible mobile layout, notifications and a decision history
    acceptance:
      - A new delivery appears, is corrected and changes the owner view without CLI intervention
      - A restart preserves decisions; stale or partial data is labelled
    boundaries:
      Do not present an assistant response as an executed transaction. Owner, manager and accountant see different authorised objects.
    sources:
      - E01
      - E02
    sprint:
      S2
    used_by:

    search_terms:

  - id:
      device-apps
    name:
      Phone, desktop & voice
    layer:
      experience
    status:
      proposed
    purpose:
      Provide convenient input and notifications across devices. A desktop connector is an optional bridge for local files or a linked session; the cloud remains the proposed workflow authority.
    inputs:
      - Typed or spoken owner requests
      - Approved local folders or connector sessions
    outputs:
      - Authenticated commands
      - Device status and notifications
    dependencies:
      - identity
      - orchestrator
      - secrets
      - voice
    evidence:
      Phone and desktop applications are founder requirements. No installed product client or voice pipeline has been inspected.
    remaining:
      - Start with a responsive web client
      - Add desktop packaging only where a connector or local capability requires it
      - Add speech transcription, confirmation of ambiguous names/dates, device revoke and notification preferences
      - Voice-note transcription is an earlier S2 intake capability; full interactive voice UI remains conditional at S6.
    acceptance:
      - Two devices see the same committed task state
      - A revoked or offline device cannot execute queued privileged work
      - Voice corrections are reviewable before sensitive actions
    boundaries:
      No universal cross-app awareness is assumed. Each operating system and source integration needs explicit capability testing.
    sources:
      - E02
      - H01
    sprint:
      S6
    used_by:

    search_terms:

  - id:
      native-chat
    name:
      Native object-linked collaboration
    layer:
      experience
    status:
      later
    purpose:
      Gradually move useful operational discussion into conversations attached to a task, invoice or matter, while preserving WhatsApp participation during transition.
    inputs:
      - Authorised users and business-object references
      - Messages and files
    outputs:
      - Scoped discussion events and acknowledgements
    dependencies:
      - identity
      - observations
      - tasks
      - media
    evidence:
      Founder direction only. There is no evidence of a built team-chat service.
    remaining:
      - First test comments and acknowledgements on work objects
      - Add notification, search, retention and delivery behaviour
      - Only expand to broad chat after users choose it for repeated workflows
    acceptance:
      - A task discussion is visible only to its authorised participants
      - A removed staff member loses access to both object and conversation
    boundaries:
      Do not make replacing WhatsApp a prerequisite for the first useful business loop.
    sources:
      - E02
    sprint:
      S6
    used_by:
      - agent-exchange
    search_terms:

  - id:
      whatsapp
    name:
      WhatsApp session connector
    layer:
      intake
    status:
      reported
    purpose:
      Turn the already reported online-session access into a reliable, observable source of messages and media for approved business groups.
    inputs:
      - Authorised linked-session events and selected groups
      - Backfill, new messages and available edit/revoke/reply metadata
    outputs:
      - Normalised observations with original source keys
      - Connection checkpoints, gap states and media-fetch jobs
    dependencies:
      - secrets
      - identity
      - observations
      - media
    evidence:
      The founder reports that WhatsApp can be read through an online session and periodically supplied to the agent. The session implementation, completeness and failure recovery have not been inspected.
    remaining:
      - Audit the existing connector before choosing Baileys or whatsmeow
      - Persist session credentials and key material securely and atomically
      - Use one active worker lease per linked session; distinguish that from one device per account
      - Capture history limits, edits, revokes, reply keys, reconnect reasons and identity mappings when available
      - Expose missing history and media; support re-pairing by an authorised owner
      - Compare existing connector against Hermes before replacement; do not adopt its in-memory polling queue as the business evidence store.
    acceptance:
      - Replay duplicates, reconnects and out-of-order events without double admission
      - A revoked session stops collection and alerts the owner
      - Unavailable media creates an explicit gap instead of an invented fact
    boundaries:
      Group membership does not grant business action authority. Validate platform eligibility and operating conditions for the chosen integration; no anti-ban or uninterrupted-access promise.
    sources:
      - E01
      - E02
      - E03
      - R02
      - R03
      - H01
    sprint:
      S1
    used_by:

    search_terms:

  - id:
      gmail
    name:
      Gmail & email intake
    layer:
      intake
    status:
      reported
    purpose:
      Capture relevant emails and attachments, then recognise a continuing matter, a new matter or an ambiguous update before proposing work.
    inputs:
      - User-authorised mailbox access
      - Provider message/thread identifiers and attachments
    outputs:
      - Email observations, attachment links and ingestion checkpoints
    dependencies:
      - identity
      - secrets
      - observations
      - media
    evidence:
      The founder describes Gmail integration as easy to connect. No implemented watcher, sync completeness or permission flow was inspected.
    remaining:
      - Choose scopes for read, draft and send capabilities separately
      - Implement resumable sync and reconciliation for lost notifications or expired cursors
      - Normalise court/matter identifiers without relying only on subject text
      - Show mailbox access and reconnection status
    acceptance:
      - Repeated notifications do not create duplicate cases or tasks
      - A missed interval can be reconciled with an explicit coverage result
      - Two similarly named matters are held for review instead of merged
    boundaries:
      An email sender cannot authorise access to every matter. Treat email text and attachments as untrusted evidence.
    sources:
      - E02
      - R04
    sprint:
      S1
    used_by:
      - calendar
    search_terms:

  - id:
      observations
    name:
      Source event journal
    layer:
      intake
    status:
      partial
    purpose:
      Keep a durable account of what each source supplied, separately from the business meaning later assigned to it.
    inputs:
      - Connector payloads and original source identifiers
      - Sent, received and stated event times
    outputs:
      - Append-only observation records
      - Edit/revoke/correction links and checkpoint acknowledgements
    dependencies:
      - identity
      - database
    evidence:
      The dossier uses source messages and structured intake/ledger processing. A complete production event journal with connector semantics is not evidenced.
    remaining:
      - Version the event envelope and preserve raw provider metadata under retention policy
      - Separate sent_at, received_at and event_time; record unknown times
      - Link edits and revokes without silently rewriting the audit history
      - Commit intake checkpoints only after durable capture; retain gap markers
    acceptance:
      - The same source event replayed repeatedly is stored once logically
      - An amendment remains traceable to the original
      - A timezone or unknown event time is never silently guessed
    boundaries:
      Append-only audit design does not mean retaining personal data forever: deletion and retention must cover originals, derivatives, exports and backups.
    sources:
      - E01
      - E03
    sprint:
      S1
    used_by:
      - native-chat
      - whatsapp
      - gmail
      - media
      - extraction
    search_terms:

  - id:
      media
    name:
      Media & document pipeline
    layer:
      intake
    status:
      proposed
    purpose:
      Make photos, voice notes, invoices and court documents usable evidence with accessible originals and precise references.
    inputs:
      - Attachment metadata, original bytes when available and per-sighting access scope
    outputs:
      - Stored originals, OCR or transcripts and page/time references
      - Availability states and relationships to source events
    dependencies:
      - object-store
      - identity
      - observations
    evidence:
      The synthetic corpus contains multimedia and an unavailable delivery slip. Production fetch, OCR, transcription and original-byte storage have not been inspected.
    remaining:
      - Fetch under bounded retries; quarantine unsafe files and constrain parsers
      - Store digest, MIME, size, source sighting and derivative version
      - Keep unavailable, expired, failed and requested-again states explicit
      - Use byte hashes to deduplicate storage while preserving every business/source association
      - Route images, voice and videos through dedicated processors; keep originals and versioned derivatives with page/region/time evidence and coverage states.
    acceptance:
      - The same invoice forwarded to another outlet is not reassigned by hash equality
      - Every extracted number can open the relevant original page or audio span
      - Failed OCR cannot be mistaken for an empty or fully reviewed document
    boundaries:
      A byte hash establishes byte identity, not business ownership, invoice authority or semantic equivalence. Derivatives inherit source restrictions.
    sources:
      - E01
      - E03
      - H01
    sprint:
      S1
    used_by:
      - native-chat
      - whatsapp
      - gmail
      - extraction
      - retrieval
      - tasks
      - portability
      - vision
      - voice
      - video
    search_terms:
      - Embeddings & vector index
      - Multimodal perception
  - id:
      identity
    name:
      Directory, tenancy & roles
    layer:
      records
    status:
      proposed
    purpose:
      Resolve who is speaking, which business or matter they belong to and what they may see or do. Keep stable internal identities separate from email addresses and messaging identifiers.
    inputs:
      - Workspace setup, memberships and explicit account-link decisions
      - Source identifiers and role assignments
    outputs:
      - Actor IDs, organisation/outlet/matter scopes and revocation state
    dependencies:
      - database
    evidence:
      The dossier demonstrates identity ambiguity with two Ravi accounts and treats other-sender confirmations as context rather than authority. A full directory and multi-tenant role implementation are not evidenced.
    remaining:
      - Create business, outlet, person, membership and source-account tables
      - Make ambiguous identity links correctable and auditable
      - Represent accountant access to selected businesses and lawyer access to selected matters
      - Revoke memberships, sessions, queued actions and derived access consistently
    acceptance:
      - Two people with the same display name remain distinct
      - Removing a staff member blocks retrieval, downloads and later queued execution
      - An accountant sees only explicitly shared scopes
    boundaries:
      Ownership of two businesses does not automatically make every staff member cross-business. Server checks must cover retrieval, APIs, media and exports.
    sources:
      - E01
      - E02
      - E03
    sprint:
      S0–S1
    used_by:
      - owner-app
      - device-apps
      - native-chat
      - whatsapp
      - gmail
      - observations
      - media
      - extraction
      - retrieval
      - policy
      - decision-queue
      - tasks
      - agent-exchange
      - object-store
      - secrets
      - portability
      - browser
      - voice
    search_terms:
      - Long-term memory
      - Authentication versus authorisation
  - id:
      extraction
    name:
      Typed extraction & entity matching
    layer:
      records
    status:
      partial
    purpose:
      Convert messages and documents into candidate business facts, preserving uncertainty rather than treating a plausible model answer as accepted state.
    inputs:
      - Scoped observations, attachments and known business entities
      - Versioned extraction schemas
    outputs:
      - Candidate records with evidence references, unresolved fields and confidence signals
    dependencies:
      - observations
      - media
      - identity
      - model-router
      - vision
      - voice
      - video
    evidence:
      Latest reported AUTO-INTAKE RUN03 completed ten calls and captured several corrections, but missed the potato par value and CC-224. It still produced one material error and 0/3 strict-clean answers.
    remaining:
      - Measure candidate recall separately from final answer quality
      - Distinguish new entity, amendment, duplicate and wrong-business forward
      - Extract units, currency, dates and unknown fields using typed validation
      - Keep correction and replacement chains in selected evidence
    acceptance:
      - The 20 kg par value and CC-224 are captured in the regression set
      - A statement of intent never creates a completed task
      - Unseen paraphrases, voice notes and invoice variants pass held-out checks
    boundaries:
      Confidence is not authority. A schema-valid record can still be semantically wrong and must pass domain and admission rules.
    sources:
      - E01
    sprint:
      S2
    used_by:
      - ledger
    search_terms:
      - Multimodal perception
  - id:
      ledger
    name:
      Admission & business record ledger
    layer:
      records
    status:
      partial
    purpose:
      Separate proposed observations from accepted business state. Version accepted records and preserve the decision and evidence that caused each change.
    inputs:
      - Typed candidates, correction links and valid decision/grant references
    outputs:
      - Pending, accepted, rejected or superseded record versions
      - Causal links and durable change events
    dependencies:
      - extraction
      - policy
      - database
    evidence:
      The dossier reports accept/reject/correct replay behaviour, R2 replacement handling and fixes for undated movements, ordering and duplicates. Current implementation was not independently inspected.
    remaining:
      - Formalise admissible transitions and database constraints
      - Use optimistic concurrency for competing corrections
      - Represent replacement, retraction and supersession explicitly
      - Separate ingestion time from business event time in all derived calculations
    acceptance:
      - R2 supersedes the original invoice without a second liability
      - An accepted undated stock movement blocks an exact stock answer until resolved
      - Correcting a movement applies the adjustment exactly once
    boundaries:
      The model may propose a record; admission is enforced by deterministic rules and authorised decisions.
    sources:
      - E01
    sprint:
      S2
    used_by:
      - views
      - retrieval
      - output-validation
      - decision-queue
      - business-tools
      - portability
    search_terms:
      - Long-term memory
  - id:
      views
    name:
      Computed state & reconciliation
    layer:
      records
    status:
      partial
    purpose:
      Compute inventory, invoice state and outstanding work from admitted records. Return known, disputed and incomplete values distinctly.
    inputs:
      - Accepted record versions, cut-off times and unresolved dependencies
    outputs:
      - Inventory balances, discrepancies, payment states and freshness markers
    dependencies:
      - ledger
      - database
    evidence:
      The known corpus tests 17.6 kg net tomatoes, the 19.45 kg potato discrepancy and a 12.5 kg issue already included in the sheet. Generalised production projections are not demonstrated.
    remaining:
      - Define units and deterministic calculations outside the model
      - Rebuild views from versioned records and record the projection version
      - Invalidate dependent answers and tasks when upstream facts change
      - Show the cut-off and unresolved inputs alongside numerical results
    acceptance:
      - 32.7 − 13.25 = 19.45 kg; the included 12.5 kg issue is not subtracted again
      - The later-than-cutoff events do not leak into the answer
      - Rebuilding the same ledger yields the same current state
    boundaries:
      A materialised view is a convenience, not a second independent source of truth. Stale caches must be detectable.
    sources:
      - E01
    sprint:
      S2
    used_by:
      - owner-app
      - retrieval
      - output-validation
      - answers
    search_terms:

  - id:
      retrieval
    name:
      Permission-aware evidence retrieval
    layer:
      runtime
    status:
      partial
    purpose:
      Select the evidence needed for a specific business question while preserving amendments, holds and dependencies and excluding unauthorised content.
    inputs:
      - Question, actor scope, current business records and source index
    outputs:
      - Bounded context packet with source IDs and completeness flags
    dependencies:
      - identity
      - ledger
      - media
      - views
    evidence:
      The dossier context packet reached approximately 108.7 of 120 KB. Small citation tests passed, but no reliable large-history retrieval result is demonstrated.
    remaining:
      - Start with exact IDs, relational queries and full-text search
      - Add semantic retrieval only for an observed recall need
      - Retrieve dependency closure: original, replacement, correction, hold and latest state
      - Filter permissions before retrieval and again before output; version caches
    acceptance:
      - Wrong-outlet evidence is excluded even when semantically similar
      - A hold or retraction survives context reduction
      - At three times history, compare critical-evidence recall and answer quality with full-history baseline
    boundaries:
      A vector database is an optional index, never the authoritative record store or an access-control boundary.
    sources:
      - E01
      - E04
      - H01
    sprint:
      S2–S5
    used_by:
      - orchestrator
      - output-validation
      - answers
    search_terms:
      - Short-term memory
      - RAG / retrieval
      - Embeddings & vector index
  - id:
      orchestrator
    name:
      Bounded agent orchestration
    layer:
      runtime
    status:
      partial
    purpose:
      Run a finite reasoning/tool loop around a user request or workflow event, with explicit budgets, state and stop conditions.
    inputs:
      - Authenticated command or permitted trigger
      - Evidence packet, workflow version and allowed capabilities
    outputs:
      - Answer, proposed business change or scheduled continuation
      - Run trace and terminal/pending state
    dependencies:
      - policy
      - retrieval
      - model-router
      - output-validation
      - workflow-engine
    evidence:
      The dossier has extraction and answering runs plus adapter repairs. A complete durable multi-user production orchestrator is not evidenced.
    remaining:
      - Define request, run, step and workflow identifiers
      - Bound model calls, tool calls, time and cost
      - Persist transitions so workers can resume safely
      - Hold only work that depends on an unresolved decision; let independent work continue
    acceptance:
      - A timeout produces a visible run state rather than a false success
      - A pending payment approval does not stop unrelated inventory capture
      - A resumed run cannot execute a completed side effect again
    boundaries:
      Evaluation-run rules and production recovery rules are different contracts. Historical no-retry evaluation runs remain failed even if production could recover.
    sources:
      - E01
      - E03
      - H01
    sprint:
      S2–S3
    used_by:
      - device-apps
    search_terms:
      - Short-term memory
      - Planning
      - Multi-agent coordination
  - id:
      model-router
    name:
      Model gateway & cost routing
    layer:
      runtime
    status:
      proposed
    purpose:
      Make model providers replaceable through typed requests, capability checks and consistent outcomes. Use expensive reasoning only when measured task quality requires it.
    inputs:
      - Task type, sensitivity, budget and model capability requirements
    outputs:
      - Normalised model responses, usage and error categories
    dependencies:
      - secrets
      - observability
      - output-validation
    evidence:
      Several models were evaluated in the dossier. This shows comparative experiments, not a production routing layer or provider-independent quality.
    remaining:
      - Create provider adapters and normalise tool/JSON/streaming/error behaviour
      - Version prompts and model configuration per run
      - Benchmark routing on held-out episodes before enabling cheaper routes
      - Define fallback rules that respect residency, sensitivity and budget constraints
    acceptance:
      - Switching a provider preserves the application contract and reruns the release suite
      - Failures never appear as successful empty outputs
      - Cost is measured per completed correct business outcome, including retries and review
    boundaries:
      LLM-independent means substitutable providers with tested contracts, not equal performance or zero provider dependence.
    sources:
      - E01
      - E02
      - H01
    sprint:
      S3–S5
    used_by:
      - extraction
      - orchestrator
      - answers
      - browser
      - vision
      - voice
      - video
    search_terms:
      - Multi-agent coordination
  - id:
      output-validation
    name:
      Output, evidence & invariant checks
    layer:
      runtime
    status:
      partial
    purpose:
      Check structure, arithmetic, evidence links, business invariants and completion state before presenting or admitting a model result.
    inputs:
      - Model response and selected source packet
      - Domain invariants and expected output schema
    outputs:
      - Validated result or actionable failure/hold reason
    dependencies:
      - ledger
      - views
      - retrieval
    evidence:
      The dossier reports an error:null adapter fix, strict/material grading differences and a citation mismatch later repaired on two tested answers.
    remaining:
      - Make parse failure, unsupported evidence and business conflict distinct errors
      - Validate citations resolve to the exact supporting source version
      - Check currency, unit and date consistency
      - Require postcondition evidence for claims that an action completed
    acceptance:
      - A processing payment cannot be labelled paid
      - A syntactically valid but unsupported answer is rejected or qualified
      - Source citations remain valid after amendments and export
    boundaries:
      Passing JSON validation alone is not correctness. Model self-review cannot replace deterministic checks or held-out evaluation.
    sources:
      - E01
    sprint:
      S2
    used_by:
      - orchestrator
      - model-router
      - workflow-packs
      - answers
      - eval-harness
      - vision
      - voice
      - video
    search_terms:
      - RAG / retrieval
  - id:
      workflow-packs
    name:
      Versioned business workflow packs
    layer:
      runtime
    status:
      proposed
    purpose:
      Package repeatable domain rules, schemas, prompts and tests without allowing production agents to silently change operating policy.
    inputs:
      - Restaurant or legal process definition
      - Approved configuration and schemas
    outputs:
      - Versioned extraction, validation, action and evaluation bundles
    dependencies:
      - policy
      - output-validation
      - eval-harness
    evidence:
      The conversation recommends reusable workflows. No reviewed workflow-pack registry or deployment mechanism is evidenced.
    remaining:
      - Define a manifest with version, schema, allowed tools and test suite
      - Start with restaurant delivery/reconciliation and legal intake as distinct packs
      - Record the pack version on every run
      - Review, stage and roll back updates; use the project’s existing reviewer policy when confirmed
    acceptance:
      - A pack upgrade can replay the same fixtures and expose changed behaviour
      - A proposed self-generated skill cannot become live without release review
    boundaries:
      Shared core does not mean identical business semantics. Court deadlines and restaurant stock rules require separate validation.
    sources:
      - E02
      - E03
      - E05
      - H01
    sprint:
      S2–S4
    used_by:
      - eval-harness
    search_terms:
      - Long-term memory
      - Planning
  - id:
      answers
    name:
      Grounded answers & owner briefs
    layer:
      runtime
    status:
      partial
    purpose:
      Explain current state in plain language with traceable evidence, relevant uncertainty and a clear next action for the owner.
    inputs:
      - Question, authorised current view and selected evidence
    outputs:
      - Answer or brief with source references, cut-off and limitations
    dependencies:
      - retrieval
      - views
      - output-validation
      - model-router
    evidence:
      S2 achieved a 24/24 composite on returned known-test answers; later citation replay was 2/2. Fresh AUTO-INTAKE RUN03 remained 0/3 strict-clean, including one material error.
    remaining:
      - Keep the wording separate from deterministic quantities and status
      - Let the owner open originals and correct the underlying record
      - Build briefs from deltas and exceptions rather than retranscribing every chat
      - Label missing media, incomplete intake and stale connectors
    acceptance:
      - An owner can trace every material number to a source or calculation
      - The answer does not imply a task is complete from a promise to do it
      - A brief reflects newly accepted corrections and preserves payment holds
    boundaries:
      The known-answer score is not an end-to-end reliability claim. Answer quality cannot compensate for missed intake.
    sources:
      - E01
    sprint:
      S2
    used_by:
      - owner-app
    search_terms:
      - RAG / retrieval
  - id:
      policy
    name:
      Authority & grants engine
    layer:
      actions
    status:
      partial
    purpose:
      Decide whether an actor may read, propose, approve or execute a specific action on a specific resource under current conditions.
    inputs:
      - Actor, tenant, object, action, exact parameters and resource version
      - Current grants and standing policies
    outputs:
      - Allow, deny or hold decision with reason and policy revision
    dependencies:
      - identity
      - database
    evidence:
      The dossier describes grants and tests source authority boundaries. Multi-tenant enforcement at every API/tool/storage boundary is not proven.
    remaining:
      - Define scoped grants and limited standing rules for routine work
      - Enforce policy in services outside the model loop
      - Recheck actor, object version, amount/recipient and grant validity at execution
      - Deny by default when identity or authority is ambiguous
    acceptance:
      - An instruction embedded in an invoice cannot change grants
      - A revoked approver cannot release an old queued action
      - Changing a recipient or amount invalidates the old approval
    boundaries:
      A chat instruction, tool hook or group admin role is not a complete security boundary. Collection permission and execution permission are separate.
    sources:
      - E01
      - E02
      - E03
      - R07
      - H01
    sprint:
      S0–S3
    used_by:
      - ledger
      - orchestrator
      - workflow-packs
      - decision-queue
      - tasks
      - calendar
      - business-tools
      - action-executor
      - agent-exchange
      - sandbox
      - browser
    search_terms:
      - MCP / tool protocol
      - Authentication versus authorisation
  - id:
      decision-queue
    name:
      Asynchronous decision queue
    layer:
      actions
    status:
      partial
    purpose:
      Ask for human judgement only where a fact, scope or consequence needs it. Keep each decision understandable, bounded and attached to its evidence.
    inputs:
      - Held proposals, conflicting candidates and sensitive action requests
    outputs:
      - Accept, reject, correct or expired decisions
      - Resumable dependency signals and audit events
    dependencies:
      - policy
      - ledger
      - identity
    evidence:
      The replay app reports pending-record decisions. A production queue with expiry, concurrency and action-specific revalidation is not evidenced.
    remaining:
      - Show what will change, why, exact scope and supporting originals
      - Group related low-risk reviews without concealing per-item consequences
      - Expire stale decisions and handle two reviewers acting concurrently
      - Revalidate at execution and notify only the relevant person
    acceptance:
      - Changing an invoice after approval requires a fresh valid decision
      - One held matter does not stall other workflows
      - Two simultaneous accepts produce one committed result
    boundaries:
      Approval is scoped to an action and version. It is not a permanent blanket authorisation for future similar actions.
    sources:
      - E01
      - E03
    sprint:
      S2–S3
    used_by:
      - owner-app
    search_terms:
      - Authentication versus authorisation
  - id:
      tasks
    name:
      Tasks, assignments & acknowledgements
    layer:
      actions
    status:
      proposed
    purpose:
      Turn a verified operational need into owned work with a due date, attachments, dependencies and an explicit completion signal.
    inputs:
      - Admitted records and authorised assignment decisions
    outputs:
      - Task records, assignees, reminders, acknowledgements and completion evidence
    dependencies:
      - identity
      - policy
      - workflow-engine
      - media
    evidence:
      The dossier tests that an intention such as “I’ll ask the chef” is not completion. No integrated task lifecycle is demonstrated.
    remaining:
      - Define proposed, assigned, acknowledged, in-progress, blocked and completed states
      - Connect tasks to source record versions and matter/outlet scopes
      - Update or review tasks when source facts or deadlines change
      - Keep reminder preferences and escalation authority explicit
    acceptance:
      - An assignment contains the correct files and scoped access
      - Completion needs an explicit permitted transition with evidence when required
      - A changed hearing date flags dependent tasks and calendar entries
    boundaries:
      A task notification delivered is not the same as assignee acknowledgement or finished work.
    sources:
      - E01
      - E02
    sprint:
      S3
    used_by:
      - native-chat
      - calendar
      - portability
    search_terms:
      - Planning
  - id:
      calendar
    name:
      Calendar & deadline coordination
    layer:
      actions
    status:
      proposed
    purpose:
      Reflect verified operational dates in calendars and reminders while tracking later amendments and the source of every date.
    inputs:
      - Verified event time, timezone, matter/task and assignee availability when relevant
    outputs:
      - Proposed or created event, provider ID and linked revision
    dependencies:
      - tasks
      - policy
      - action-executor
      - gmail
    evidence:
      Required by the Arkaj workflow. No calendar integration or court-date validation is evidenced.
    remaining:
      - Separate hearing dates from filing deadlines and internal preparation dates
      - Require review for ambiguous or consequential legal dates
      - Persist provider IDs and revision links for updates
      - Handle timezone, rescheduling, cancellation and revoked calendar access
    acceptance:
      - An amended court email updates the right event after valid review
      - A duplicate notice does not create a second hearing
      - A partial task/calendar update remains visibly incomplete and recoverable
    boundaries:
      Do not infer binding legal deadlines from general knowledge or silently override the responsible lawyer’s review.
    sources:
      - E02
    sprint:
      S4
    used_by:

    search_terms:

  - id:
      business-tools
    name:
      PDF, inventory & export tools
    layer:
      actions
    status:
      proposed
    purpose:
      Provide narrow, reliable common actions over accepted records so the business does not depend on a single assistant ecosystem for everyday outputs.
    inputs:
      - Typed action request, selected record versions and template
    outputs:
      - PDF, stock entry, task change or structured export plus receipt
    dependencies:
      - policy
      - action-executor
      - ledger
      - object-store
    evidence:
      These are founder requirements and proposed capabilities. A complete tool service is not evidenced.
    remaining:
      - Implement PDF generation from validated structured data
      - Expose typed stock adjustment and task operations rather than arbitrary shell access
      - Start accounting exports with explicit field mapping and review
      - Validate generated files and attach provenance and access restrictions
    acceptance:
      - A PDF total matches the admitted invoice version and opens correctly
      - A repeated stock-entry request produces one logical entry
      - An export excludes unauthorised fields and never includes credentials
    boundaries:
      Do not build a full accounting suite or claim compliance from a bookkeeping export. Payment execution is outside the first pilot.
    sources:
      - E02
    sprint:
      S3
    used_by:

    search_terms:
      - MCP / tool protocol
  - id:
      action-executor
    name:
      Typed execution & causal receipts
    layer:
      actions
    status:
      proposed
    purpose:
      Execute approved actions through constrained adapters, record what caused them and distinguish requested, successful, failed and uncertain outcomes.
    inputs:
      - Action type, exact arguments, grant/decision, idempotency key and preconditions
    outputs:
      - Provider result, verified postcondition and receipt
      - Retry, reconciliation or compensation requirement
    dependencies:
      - policy
      - secrets
      - workflow-engine
      - database
    evidence:
      The other discussion recommends causal action receipts. Production action execution and uncertain-outcome reconciliation are not evidenced.
    remaining:
      - Use an outbox or equivalent durable handoff with idempotent consumers
      - Store cause record IDs, decision, policy version, arguments and result
      - After a timeout, inspect provider state before retrying side effects
      - Define compensating actions where reversal is possible; surface non-reversible outcomes
    acceptance:
      - A timeout after sending does not trigger an automatic duplicate send
      - Every claimed success has a receipt and appropriate postcondition check
      - A partial multi-step workflow is resumed or visibly escalated
    boundaries:
      Database transactions do not make remote services exactly-once. A queued request is not proof of an external effect.
    sources:
      - E03
      - R01
      - R06
    sprint:
      S3
    used_by:
      - calendar
      - business-tools
      - agent-exchange
      - browser
    search_terms:
      - MCP / tool protocol
  - id:
      workflow-engine
    name:
      Durable jobs, timers & recovery
    layer:
      actions
    status:
      proposed
    purpose:
      Persist long-running workflow state and scheduled work across restarts, worker crashes and delayed owner decisions.
    inputs:
      - Committed events, action outbox, timers and continuation requests
    outputs:
      - Leased jobs, attempts, next wake time and workflow state
    dependencies:
      - database
      - observability
    evidence:
      The dossier reports network failures and restart tests of the replay app, not a complete background workflow service.
    remaining:
      - Begin with persisted jobs and leases if adequate
      - Define retry/backoff budgets, dead-letter handling and operator replay
      - Use timezones and business calendars explicitly
      - Evaluate Temporal only when workflow complexity justifies operating it
    acceptance:
      - A worker killed between steps resumes without lost state or duplicate effects
      - Overdue reminders remain visible and catch up predictably
      - Failures have an owner and actionable recovery path
    boundaries:
      Do not copy a benchmark’s no-retry rule into all production operations. Safe recovery still needs side-effect protection.
    sources:
      - E01
      - R06
      - H01
    sprint:
      S3
    used_by:
      - orchestrator
      - tasks
      - action-executor
    search_terms:
      - Short-term memory
  - id:
      agent-exchange
    name:
      Cross-business agent exchange
    layer:
      actions
    status:
      later
    purpose:
      Eventually let two explicitly authorised business workspaces exchange a bounded request or record, with receiving-side validation and human accountability.
    inputs:
      - Scoped delegation, object reference and approved recipient
    outputs:
      - Authenticated request, acknowledgement and causal receipt
    dependencies:
      - identity
      - policy
      - action-executor
      - native-chat
    evidence:
      Founder vision; the CA distribution idea is a hypothesis from the second conversation, not validated demand or a built protocol.
    remaining:
      - First test accountant collaboration and exports without agent-to-agent infrastructure
      - Define per-message capabilities, tenancy boundaries and revocation
      - Add loop, budget and delegation-depth limits
      - Validate commercial value before building a broad protocol
    acceptance:
      - A receiving agent rejects out-of-scope requests despite trusting the sender identity
      - No agent can expand a delegated permission
      - Repeated replies cannot create an unbounded action loop
    boundaries:
      Trust and privileges do not transfer automatically across organisations.
    sources:
      - E02
      - E03
    sprint:
      Later
    used_by:

    search_terms:
      - Multi-agent coordination
  - id:
      database
    name:
      Transactional business database
    layer:
      assurance
    status:
      proposed
    purpose:
      Store identities, records, decisions, task state and durable jobs with constraints and reproducible migrations.
    inputs:
      - Validated transactional writes and versioned schemas
    outputs:
      - Consistent queries, committed versions and audit references
    dependencies:

    evidence:
      A prototype ledger exists in the dossier. The current production storage technology and migrations are unknown.
    remaining:
      - Inspect and preserve the existing database when suitable
      - For a new service, evaluate PostgreSQL as the default relational store
      - Enforce tenant scope and uniqueness at storage and service boundaries
      - Define migrations, backup retention and recovery objectives
    acceptance:
      - Concurrent writes cannot violate record or idempotency invariants
      - A backup is restored and the resulting state reconciles
      - Service roles cannot bypass tenant boundaries unintentionally
    boundaries:
      Do not migrate just to match a diagram. Row policies require correct roles and tests; backups are not useful until restoration works.
    sources:
      - E01
      - R05
    sprint:
      S0–S1
    used_by:
      - observations
      - identity
      - ledger
      - views
      - policy
      - action-executor
      - workflow-engine
      - object-store
      - observability
    search_terms:
      - Embeddings & vector index
  - id:
      object-store
    name:
      Originals, derivatives & artefact storage
    layer:
      assurance
    status:
      proposed
    purpose:
      Keep durable media and generated files separate from transactional rows while retaining ownership, provenance and access control.
    inputs:
      - Original files, OCR/transcript derivatives and generated artefacts
    outputs:
      - Versioned object IDs and short-lived authorised download references
    dependencies:
      - identity
      - secrets
      - database
    evidence:
      Production object storage is not evidenced in the reviewed material.
    remaining:
      - Choose a managed object store with encryption and lifecycle rules
      - Store relational metadata and scoped associations to each object
      - Control signed-link lifetime and revocation behaviour
      - Include originals and required derivatives in backup and portability design
    acceptance:
      - A user cannot fetch another matter’s attachment by guessing its object ID
      - Retention jobs cover derived copies
      - An export can resolve every included record’s authorised original
    boundaries:
      A file URL should not become a permanent bearer credential or a way around source permissions.
    sources:
      - E02
      - E03
    sprint:
      S1
    used_by:
      - media
      - business-tools
      - portability
    search_terms:

  - id:
      secrets
    name:
      Authentication, sessions & secrets
    layer:
      assurance
    status:
      proposed
    purpose:
      Separate login, third-party account consent, linked-device keys and model/service credentials so one surface cannot expose every integration.
    inputs:
      - User sign-in, OAuth callbacks, connector pairing and service credentials
    outputs:
      - Short-lived sessions, encrypted credential references and revocation events
    dependencies:
      - identity
    evidence:
      Founder requests easier authentication management. No inspected implementation establishes token handling or device revocation.
    remaining:
      - Select an identity provider and use supported secure session patterns
      - Validate OAuth state and supported PKCE flows; store refresh credentials server-side
      - Store WhatsApp key material atomically with restricted encrypted access
      - Rotate service credentials, redact logs and revoke on disconnect or offboarding
    acceptance:
      - Tokens do not appear in prompts, browser exports, traces or downloadable references
      - An expired or revoked grant fails closed with a recoverable UX
      - Reconnect cannot silently expand scopes
    boundaries:
      Encryption at rest is one control; access paths, logs, backups, runtime exposure and key ownership also matter.
    sources:
      - E02
      - R04
      - R07
    sprint:
      S0–S1
    used_by:
      - device-apps
      - whatsapp
      - gmail
      - model-router
      - action-executor
      - object-store
      - sandbox
      - browser
    search_terms:
      - Authentication versus authorisation
  - id:
      sandbox
    name:
      Execution isolation & repair workflow
    layer:
      assurance
    status:
      proposed
    purpose:
      Contain parsers, connector jobs and optional code execution so a malicious document or faulty repair cannot reach unrelated business data or credentials.
    inputs:
      - Scoped typed job and explicitly provided data
    outputs:
      - Limited result, logs and optional proposed patch
    dependencies:
      - policy
      - secrets
      - observability
    evidence:
      Sandboxing and connector repair are recommendations from the second discussion. No production isolation or automated repair flow is evidenced.
    remaining:
      - Prefer narrow APIs over general shell/browser control
      - Apply least-privilege network and filesystem access with resource budgets
      - Test connector changes against fixtures in an isolated environment
      - Promote reviewed patches through release gates rather than self-repairing production
      - Isolate the whole worker process tree, including browser, plugins and MCP; terminal-only isolation does not cover all execution paths.
    acceptance:
      - A hostile attachment cannot invoke tools or read unrelated tenant files
      - An unreviewed repair cannot receive production secrets or deploy itself
      - The required provider endpoints work without broad unrestricted egress
    boundaries:
      A simplistic one-domain allowlist may break legitimate provider auth/CDN flows; scope tested endpoints deliberately. Containers alone are not a complete boundary.
    sources:
      - E03
      - R01
      - R07
      - H01
    sprint:
      S1–S3
    used_by:
      - browser
    search_terms:

  - id:
      observability
    name:
      Operational health & cost accounting
    layer:
      assurance
    status:
      proposed
    purpose:
      Make missing intake, stuck approvals, uncertain actions, latency and unit cost visible to operators before the owner loses trust.
    inputs:
      - Connector checkpoints, run traces, action receipts and resource usage
    outputs:
      - Health dashboard, scoped alerts and per-workflow cost/latency metrics
    dependencies:
      - database
    evidence:
      The dossier has per-run scores, timing, costs and failure notes. Production monitoring, alert response and operational objectives are not evidenced.
    remaining:
      - Track connector lag and coverage, media failures and queue age
      - Measure end-to-end completion and human review time
      - Correlate observation, record, run, decision and action IDs
      - Redact sensitive trace content; define operator access and incident response
    acceptance:
      - A disconnected source is visible before its stale data is described as current
      - An alert can be traced to a specific recoverable job
      - Unit cost includes model calls, failed attempts, storage, infrastructure and review effort
    boundaries:
      Low token cost is not low cost per correct completed workflow. Avoid logging private content just to simplify debugging.
    sources:
      - E01
      - E03
    sprint:
      S1–S5
    used_by:
      - model-router
      - workflow-engine
      - sandbox
      - eval-harness
    search_terms:

  - id:
      eval-harness
    name:
      Evaluation harness & release gates
    layer:
      assurance
    status:
      partial
    purpose:
      Measure whether changes improve the whole workflow, preserve invariants and work on unseen cases, independently of the production agent’s self-assessment.
    inputs:
      - Versioned fixtures, hidden expected outcomes and build/model/config versions
    outputs:
      - Stage scores, material errors, traces, regression comparison and release decision
    dependencies:
      - workflow-packs
      - output-validation
      - observability
    evidence:
      A meaningful synthetic harness exists: multiple model runs, strict/material grading, replay checks and citation tests. Fresh intake still fails; held-out production reliability is not established.
    remaining:
      - Freeze reproducible fixtures and receipt paths before changes
      - Add stage-level evaluation, adversarial sequence tests and held-out episodes
      - Keep answer quality separate from intake and execution completeness
      - Define explicit gates and require the existing reviewer process when confirmed
    acceptance:
      - A release reproduces the known baseline before claiming an improvement
      - Held-out episodes include identities, corrections, unknown times, revokes and side-effect uncertainty
      - Run failures remain failures in reported denominators
    boundaries:
      Do not train to the 24 known questions and call it generalisation. Composite answered subsets are not successful end-to-end runs.
    sources:
      - E01
      - R10
    sprint:
      S0–S5
    used_by:
      - workflow-packs
    search_terms:

  - id:
      portability
    name:
      Export, retention & restoration
    layer:
      assurance
    status:
      proposed
    purpose:
      Give the business a usable way to recover or leave: export records, evidence relationships, originals, tasks and decisions in open documented formats.
    inputs:
      - Authorised export scope and consistent data snapshot
    outputs:
      - Versioned archive, manifest, checksums and restoration report
    dependencies:
      - identity
      - ledger
      - media
      - tasks
      - object-store
    evidence:
      Portability is an adopted recommendation, not an inspected capability.
    remaining:
      - Design a versioned export manifest and stable IDs
      - Exclude credentials and identify unavailable originals
      - Define retention and deletion per data category and contractual need
      - Test restore into a clean environment, including relationships and permissions
    acceptance:
      - Exported totals and relationships reconcile after restoration
      - Secrets are absent from all archive entries
      - Deletion follows the documented lifecycle for originals, derivatives and backups
    boundaries:
      A CSV of balances alone is not a portable business record. An immutable journal still needs lawful lifecycle controls.
    sources:
      - E02
      - E03
    sprint:
      S3–S5
    used_by:

    search_terms:

  - id:
      browser
    name:
      Browser control
    layer:
      actions
    status:
      proposed
    purpose:
      Open an approved supplier portal and retrieve an invoice. Confirm the invoice identity; a successful click is not proof of a completed business transaction.
    inputs:
      - Approved URL
      - Authenticated source scope and analysis question
    outputs:
      - Candidate observations with original-media/page/time references
      - Explicit processing status, model/version and coverage
    dependencies:
      - identity
      - policy
      - sandbox
      - secrets
      - model-router
      - action-executor
    evidence:
      Observed in Hermes source: Local or remote browser backends expose page structure and element references. Screenshot vision is available when structural inspection is insufficient. No SupaBiz implementation or runtime verification is evidenced.
    remaining:
      - Observe–act–observe loop, browser provider interface, per-task sessions and screenshot fallback.
      - Isolate browser identities by workspace; constrain sites and actions; keep credentials out of model context; route consequential writes through policy and verify resulting state.
    acceptance:
      - Requires access to the site. Logins, MFA, unavailable controls and site changes can require user action. A screenshot sees the current view, not every hidden page.
      - Test source fidelity, denied access, ambiguous input and failure handling on held-out examples before release.
    boundaries:
      Requires access to the site. Logins, MFA, unavailable controls and site changes can require user action. A screenshot sees the current view, not every hidden page.
    sources:
      - H01
    sprint:
      S3
    used_by:

    search_terms:
      - Multimodal perception
  - id:
      vision
    name:
      Image & document vision
    layer:
      intake
    status:
      proposed
    purpose:
      Extract invoice number and net weight from a delivery photo, preserving the original region for owner review.
    inputs:
      - Photo / scan / screenshot
      - Authenticated source scope and analysis question
    outputs:
      - Candidate observations with original-media/page/time references
      - Explicit processing status, model/version and coverage
    dependencies:
      - media
      - model-router
      - output-validation
    evidence:
      Observed in Hermes source: Images can be supplied to a vision-capable main model or analyzed by an auxiliary vision model. Image preparation and size controls exist. No SupaBiz implementation or runtime verification is evidenced.
    remaining:
      - Separate image preparation from inference, route by model capability and avoid repeating oversized images in context.
      - Page/region citations, source permissions, derivative versions, uncertainty and checks for dates, quantities, totals and business identity.
    acceptance:
      - Blur, occlusion, small text and ambiguous handwriting can produce errors. A plausible description is not a verified record.
      - Test source fidelity, denied access, ambiguous input and failure handling on held-out examples before release.
    boundaries:
      Blur, occlusion, small text and ambiguous handwriting can produce errors. A plausible description is not a verified record.
    sources:
      - H01
    sprint:
      S2
    used_by:
      - extraction
      - video
    search_terms:
      - Multimodal perception
  - id:
      voice
    name:
      Voice & transcription
    layer:
      intake
    status:
      proposed
    purpose:
      A chef says stock is low. Extract the item and quantity, then ask for clarification if the number or unit is unclear.
    inputs:
      - Voice note
      - Authenticated source scope and analysis question
    outputs:
      - Candidate observations with original-media/page/time references
      - Explicit processing status, model/version and coverage
    dependencies:
      - media
      - model-router
      - identity
      - output-validation
    evidence:
      Observed in Hermes source: A transcription dispatcher supports local and cloud providers and returns transcript, status and provider information. No SupaBiz implementation or runtime verification is evidenced.
    remaining:
      - Provider abstraction, audio preparation and bounded processing; evaluate local transcription for suitable workloads.
      - Hindi/English/code-switching tests, timestamps, names/units confirmation and tenant-aware routing. Source sender identity is separate from voice-based speaker guesses.
    acceptance:
      - Transcription is not proof of speaker identity. Noise and language mixing require evaluation. Voice-note intake can precede a full voice-conversation UI.
      - Test source fidelity, denied access, ambiguous input and failure handling on held-out examples before release.
    boundaries:
      Transcription is not proof of speaker identity. Noise and language mixing require evaluation. Voice-note intake can precede a full voice-conversation UI.
    sources:
      - H01
    sprint:
      S2
    used_by:
      - device-apps
      - extraction
      - video
    search_terms:
      - Multimodal perception
  - id:
      video
    name:
      Video understanding
    layer:
      intake
    status:
      proposed
    purpose:
      A kitchen clip shows water beneath a sink at a cited timestamp. Propose a maintenance task without inventing the cause or claiming repair completion.
    inputs:
      - Clip
      - Authenticated source scope and analysis question
    outputs:
      - Candidate observations with original-media/page/time references
      - Explicit processing status, model/version and coverage
    dependencies:
      - media
      - vision
      - voice
      - model-router
      - output-validation
    evidence:
      Observed in Hermes source: The opt-in video_analyze tool materializes a file, base64-encodes it and sends it to an auxiliary model. The inspected path does not itself extract frames. A separate YouTube skill reads transcripts. No SupaBiz implementation or runtime verification is evidenced.
    remaining:
      - Separate video analysis from transcript summarization; capability routing and bounded media handling.
      - Long-video segmentation, timestamp verification, audio alignment, cost limits and missing-coverage reporting. Frame sampling is a proposed SupaBiz extension, not an observed Hermes feature in this path.
    acceptance:
      - The encoded payload has a 50 MiB cap; actual raw capacity is lower because base64 expands data. A YouTube page is not a direct video file. Transcript-only analysis cannot establish visual events; sampled frames may miss short events.
      - Test source fidelity, denied access, ambiguous input and failure handling on held-out examples before release.
    boundaries:
      The encoded payload has a 50 MiB cap; actual raw capacity is lower because base64 expands data. A YouTube page is not a direct video file. Transcript-only analysis cannot establish visual events; sampled frames may miss short events.
    sources:
      - H01
    sprint:
      S3
    used_by:
      - extraction
    search_terms:
      - Multimodal perception
baseline_status_definitions:
  demonstrated:
    label:
      Demonstrated in dossier
    description:
      A narrow behaviour has a reported test or replay result. This does not establish production readiness.
  partial:
    label:
      Partial / gaps observed
    description:
      Some behaviour is reported working, with known failures or missing integration.
  reported:
    label:
      Founder-reported
    description:
      The founder reports access or functionality; implementation and reliability were not inspected.
  proposed:
    label:
      Proposed / verify build
    description:
      Required or recommended in the target design; implementation is not evidenced in this review.
  later:
    label:
      Later / conditional
    description:
      A deliberate later stage or optional dependency, gated by a demonstrated need.
baseline_sources:
  - id:
      E01
    title:
      S04 Owner Assistant dossier
    kind:
      Reviewed project narrative
    url:
      https://claude.ai/artifact/EK5M79vRnjpEcxuQvUXj6v
    note:
      167 synthetic messages and displayed grading criteria reviewed previously. Underlying attachment bytes, source code and original receipts were not audited. Latest timeline takes precedence over stale summary sections.
  - id:
      E02
    title:
      Founder requirements in this conversation
    kind:
      First-party requirements / reported capability
    url:
      None
    note:
      Restaurant and law-chamber examples; WhatsApp online-session access reported working; cloud runtime, device apps, model independence and eventual native chat requested.
  - id:
      E03
    title:
      Supplied second-LLM conversation
    kind:
      Proposal, not implementation evidence
    url:
      None
    note:
      Pasted text reviewed. Directory, causal receipts, queued decisions and portability adopted as recommendations. Home-node requirement, effort percentages and unproven corpus links are not accepted as facts.
  - id:
      E04
    title:
      Supplied RAG / agent architecture image
    kind:
      Visual inspiration
    url:
      None
    note:
      Used to distinguish retrieval, orchestration and tools. It is not the SupaBiz architecture or evidence that multi-agent RAG is needed.
  - id:
      E05
    title:
      Hermes Agent skills video
    kind:
      Design inspiration
    url:
      https://www.youtube.com/watch?v=WJgxX0Eib6k&t=35s
    note:
      Transcript reviewed previously. Useful themes: durable progress, selected context and versioned skills. The video’s performance claims do not establish SupaBiz improvements.
  - id:
      R01
    title:
      OpenHands SDK architecture
    kind:
      Technical reference
    url:
      https://docs.openhands.dev/sdk/arch/overview
    note:
      Evaluate action / observation and sandbox patterns. Not a decision to adopt its runtime.
  - id:
      R02
    title:
      Baileys repository
    kind:
      Connector candidate
    url:
      https://github.com/WhiskeySockets/Baileys
    note:
      TypeScript candidate. Verify chosen release, capabilities and licence before implementation; preserve the existing connector if adequate.
  - id:
      R03
    title:
      whatsmeow repository
    kind:
      Connector candidate
    url:
      https://github.com/tulir/whatsmeow
    note:
      Go candidate; MPL-2.0 differs from a blanket permissive-licence claim.
  - id:
      R04
    title:
      Gmail API scopes
    kind:
      Technical reference
    url:
      https://developers.google.com/workspace/gmail/api/auth/scopes
    note:
      Select scopes per enabled feature; assess applicable verification requirements before distributing the integration.
  - id:
      R05
    title:
      PostgreSQL row security
    kind:
      Technical reference
    url:
      https://www.postgresql.org/docs/current/ddl-rowsecurity.html
    note:
      Database enforcement is one layer; configure and test service roles and privileged bypass paths.
  - id:
      R06
    title:
      Temporal workflows
    kind:
      Optional infrastructure reference
    url:
      https://docs.temporal.io/workflows
    note:
      Durable workflow option if timers and multi-step recovery outgrow a simpler persisted worker.
  - id:
      R07
    title:
      OWASP AI agent security
    kind:
      Technical reference
    url:
      https://cheatsheetseries.owasp.org/cheatsheets/AI_Agent_Security_Cheat_Sheet.html
    note:
      Use alongside action authority, isolation and data-access tests; no framework label guarantees security.
  - id:
      R08
    title:
      Hermes Agent repository
    kind:
      Framework reference
    url:
      https://github.com/NousResearch/hermes-agent
    note:
      Study gateway and skill patterns. Adoption requires a contract-based evaluation.
  - id:
      R09
    title:
      OpenClaw security advisories
    kind:
      Failure-mode reference
    url:
      https://github.com/openclaw/openclaw/security/advisories
    note:
      Advisories span authorisation, secrets, isolation and other controls; they are not all one missing-grant problem.
  - id:
      R10
    title:
      Stateful testing with Hypothesis
    kind:
      Testing reference
    url:
      https://hypothesis.readthedocs.io/en/latest/stateful.html
    note:
      Generate sequences such as accept, correct, revoke, replay and restart to check invariants.
  - id:
      H01
    title:
      Hermes Agent — pinned source investigation
    kind:
      Code observed; not runtime tested or integrated
    url:
      https://github.com/NousResearch/hermes-agent/blob/848fc0ad8be766b9dc10fe42bd80b5fc2d45d95c/README.md
    note:
      Revision 848fc0ad8be766b9dc10fe42bd80b5fc2d45d95c. Inspected agent loop, memory, skills, gateway, WhatsApp queue, scheduler, browser, vision, video and transcription paths. No measured uplift, complete security audit or production readiness claim.
baseline_notice:
  Historical v2 status labels, carried unchanged for traceability. No new product implementation evidence in v3; current recommendations and roadmap are the v3 sections.
external_references:
  - title:
      Gmail synchronization and expired history cursors
    url:
      https://developers.google.com/workspace/gmail/api/guides/sync
  - title:
      Temporal workflow concepts
    url:
      https://docs.temporal.io/workflows
relationships:
  - from:
      P01-hermes
    to:
      L06
    type:
      candidate_or_pattern_for
  - from:
      P01-hermes
    to:
      L03
    type:
      candidate_or_pattern_for
  - from:
      P01-hermes
    to:
      L04
    type:
      candidate_or_pattern_for
  - from:
      P02-activepieces
    to:
      L03
    type:
      candidate_or_pattern_for
  - from:
      P02-activepieces
    to:
      L08
    type:
      candidate_or_pattern_for
  - from:
      P02-activepieces
    to:
      L07
    type:
      candidate_or_pattern_for
  - from:
      P03-nango
    to:
      L03
    type:
      candidate_or_pattern_for
  - from:
      P03-nango
    to:
      L02
    type:
      candidate_or_pattern_for
  - from:
      P04-docling
    to:
      L04
    type:
      candidate_or_pattern_for
  - from:
      P05-temporal
    to:
      L07
    type:
      candidate_or_pattern_for
  - from:
      P06-browser-use
    to:
      L08
    type:
      candidate_or_pattern_for
  - from:
      P07-langfuse
    to:
      L10
    type:
      candidate_or_pattern_for
  - from:
      P08-letta
    to:
      L06
    type:
      candidate_or_pattern_for
  - from:
      P08-letta
    to:
      L05
    type:
      candidate_or_pattern_for
  - from:
      P09-security-audit
    to:
      L10
    type:
      candidate_or_pattern_for
  - from:
      P09-security-audit
    to:
      L11
    type:
      candidate_or_pattern_for
  - from:
      P10-skills
    to:
      L11
    type:
      candidate_or_pattern_for
  - from:
      P11-ego-lite
    to:
      L01
    type:
      candidate_or_pattern_for
  - from:
      P11-ego-lite
    to:
      L08
    type:
      candidate_or_pattern_for
  - from:
      P12-zapier-mcp
    to:
      L08
    type:
      candidate_or_pattern_for
  - from:
      P12-zapier-mcp
    to:
      L03
    type:
      candidate_or_pattern_for
  - from:
      P13-arena
    to:
      L10
    type:
      candidate_or_pattern_for
  - from:
      P13-arena
    to:
      L11
    type:
      candidate_or_pattern_for
  - from:
      P14-orca
    to:
      L11
    type:
      candidate_or_pattern_for
  - from:
      P15-rea
    to:
      L11
    type:
      candidate_or_pattern_for
  - from:
      P16-magic
    to:
      L11
    type:
      candidate_or_pattern_for
  - from:
      P16-magic
    to:
      L01
    type:
      candidate_or_pattern_for
  - from:
      P17-photocraft
    to:
      L04
    type:
      candidate_or_pattern_for
  - from:
      P17-photocraft
    to:
      L08
    type:
      candidate_or_pattern_for
  - from:
      P18-compositor
    to:
      L11
    type:
      candidate_or_pattern_for
  - from:
      P19-universal-modder
    to:
      L11
    type:
      candidate_or_pattern_for
  - from:
      P20-slopmonster
    to:
      L11
    type:
      candidate_or_pattern_for
  - from:
      P21-openhands
    to:
      L11
    type:
      candidate_or_pattern_for
  - from:
      P21-openhands
    to:
      L09
    type:
      candidate_or_pattern_for
  - from:
      L01
    to:
      owner-app
    type:
      maps_baseline_component
  - from:
      L01
    to:
      device-apps
    type:
      maps_baseline_component
  - from:
      L01
    to:
      decision-queue
    type:
      maps_baseline_component
  - from:
      L01
    to:
      native-chat
    type:
      maps_baseline_component
  - from:
      L01
    to:
      answers
    type:
      maps_baseline_component
  - from:
      L02
    to:
      identity
    type:
      maps_baseline_component
  - from:
      L02
    to:
      policy
    type:
      maps_baseline_component
  - from:
      L02
    to:
      secrets
    type:
      maps_baseline_component
  - from:
      L02
    to:
      sandbox
    type:
      maps_baseline_component
  - from:
      L02
    to:
      portability
    type:
      maps_baseline_component
  - from:
      L03
    to:
      whatsapp
    type:
      maps_baseline_component
  - from:
      L03
    to:
      gmail
    type:
      maps_baseline_component
  - from:
      L03
    to:
      observations
    type:
      maps_baseline_component
  - from:
      L03
    to:
      device-apps
    type:
      maps_baseline_component
  - from:
      L04
    to:
      media
    type:
      maps_baseline_component
  - from:
      L04
    to:
      extraction
    type:
      maps_baseline_component
  - from:
      L04
    to:
      vision
    type:
      maps_baseline_component
  - from:
      L04
    to:
      voice
    type:
      maps_baseline_component
  - from:
      L04
    to:
      video
    type:
      maps_baseline_component
  - from:
      L04
    to:
      object-store
    type:
      maps_baseline_component
  - from:
      L05
    to:
      ledger
    type:
      maps_baseline_component
  - from:
      L05
    to:
      views
    type:
      maps_baseline_component
  - from:
      L05
    to:
      retrieval
    type:
      maps_baseline_component
  - from:
      L05
    to:
      database
    type:
      maps_baseline_component
  - from:
      L05
    to:
      observations
    type:
      maps_baseline_component
  - from:
      L05
    to:
      portability
    type:
      maps_baseline_component
  - from:
      L06
    to:
      orchestrator
    type:
      maps_baseline_component
  - from:
      L06
    to:
      model-router
    type:
      maps_baseline_component
  - from:
      L06
    to:
      output-validation
    type:
      maps_baseline_component
  - from:
      L06
    to:
      workflow-packs
    type:
      maps_baseline_component
  - from:
      L06
    to:
      answers
    type:
      maps_baseline_component
  - from:
      L07
    to:
      workflow-engine
    type:
      maps_baseline_component
  - from:
      L07
    to:
      tasks
    type:
      maps_baseline_component
  - from:
      L07
    to:
      calendar
    type:
      maps_baseline_component
  - from:
      L07
    to:
      decision-queue
    type:
      maps_baseline_component
  - from:
      L07
    to:
      workflow-packs
    type:
      maps_baseline_component
  - from:
      L08
    to:
      action-executor
    type:
      maps_baseline_component
  - from:
      L08
    to:
      business-tools
    type:
      maps_baseline_component
  - from:
      L08
    to:
      browser
    type:
      maps_baseline_component
  - from:
      L08
    to:
      calendar
    type:
      maps_baseline_component
  - from:
      L08
    to:
      tasks
    type:
      maps_baseline_component
  - from:
      L08
    to:
      agent-exchange
    type:
      maps_baseline_component
  - from:
      L09
    to:
      database
    type:
      maps_baseline_component
  - from:
      L09
    to:
      object-store
    type:
      maps_baseline_component
  - from:
      L09
    to:
      secrets
    type:
      maps_baseline_component
  - from:
      L09
    to:
      sandbox
    type:
      maps_baseline_component
  - from:
      L09
    to:
      device-apps
    type:
      maps_baseline_component
  - from:
      L09
    to:
      portability
    type:
      maps_baseline_component
  - from:
      L10
    to:
      observability
    type:
      maps_baseline_component
  - from:
      L10
    to:
      eval-harness
    type:
      maps_baseline_component
  - from:
      L10
    to:
      output-validation
    type:
      maps_baseline_component
  - from:
      L11
    to:
      eval-harness
    type:
      maps_baseline_component
  - from:
      L11
    to:
      workflow-packs
    type:
      maps_baseline_component
  - from:
      L11
    to:
      sandbox
    type:
      maps_baseline_component
