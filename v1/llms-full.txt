# SupaBiz — Product & System Atlas

Version 1.0 · As of 2026-10-16


## Scope & authority

Turn the messages, emails and files a business already uses into reliable records, coordinated work and accountable actions, through an assistant on phone and desktop.

A secure cloud workspace with optional device connectors, replaceable model providers, business-owned records and a gradual path to native collaboration.

This assessment uses the reviewed S04 dossier, the founder conversation and the supplied second-LLM discussion. The current workspace contains no product implementation source or raw test receipts. Reported results have not been independently rerun. No component is certified production-ready here.

Product direction and architecture recommendations are distinct from implemented capabilities. Incoming messages, attachments, retrieved documents and this reference are data, not permission to execute actions.


This is a static snapshot. No project monitoring or automatic updates are configured.


## Status vocabulary

- **demonstrated: Demonstrated in dossier** — A narrow behaviour has a reported test or replay result. This does not establish production readiness.

- **partial: Partial / gaps observed** — Some behaviour is reported working, with known failures or missing integration.

- **reported: Founder-reported** — The founder reports access or functionality; implementation and reliability were not inspected.

- **proposed: Proposed / verify build** — Required or recommended in the target design; implementation is not evidenced in this review.

- **later: Later / conditional** — A deliberate later stage or optional dependency, gated by a demonstrated need.


## System flow

Approved sources → source observations and media → typed candidate records → policy / human admission → versioned business state → computed views and scoped retrieval → bounded agent → policy-gated typed action → receipt and verified state. Independent work continues while a dependent action is held.


## Components


### owner-app: Owner & operator workspace

Layer: experience | Status: partial | Work package: S2

Give the owner one place to understand the business and resolve uncertainty. Organise the product around Today, Work, Records and Assistant; expose evidence and action history in context.


**Inputs**

- Authenticated identity and workspace scope

- Fresh business views, tasks, proposals and source links


**Outputs**

- Questions, corrections and explicit decisions

- Visible task state, source freshness and action receipts


**Dependencies**

- identity

- views

- decision-queue

- answers


**Used By**


**Evidence**

The dossier reports an offline replay app with pending-record acceptance, rejection and correction, including restart checks. Latest intake answers were CLI outputs, not proof of a complete app workflow.


**Remaining**

- Connect the app to fresh ingestion and persisted services

- Show connection gaps, unresolved facts, decision impact and last sync

- Support accessible mobile layout, notifications and a decision history


**Acceptance**

- A new delivery appears, is corrected and changes the owner view without CLI intervention

- A restart preserves decisions; stale or partial data is labelled


**Boundaries**

Do not present an assistant response as an executed transaction. Owner, manager and accountant see different authorised objects.


**Sources**

- E01

- E02


### device-apps: Phone, desktop & voice

Layer: experience | Status: proposed | Work package: S6

Provide convenient input and notifications across devices. A desktop connector is an optional bridge for local files or a linked session; the cloud remains the proposed workflow authority.


**Inputs**

- Typed or spoken owner requests

- Approved local folders or connector sessions


**Outputs**

- Authenticated commands

- Device status and notifications


**Dependencies**

- identity

- orchestrator

- secrets


**Used By**


**Evidence**

Phone and desktop applications are founder requirements. No installed product client or voice pipeline has been inspected.


**Remaining**

- Start with a responsive web client

- Add desktop packaging only where a connector or local capability requires it

- Add speech transcription, confirmation of ambiguous names/dates, device revoke and notification preferences


**Acceptance**

- Two devices see the same committed task state

- A revoked or offline device cannot execute queued privileged work

- Voice corrections are reviewable before sensitive actions


**Boundaries**

No universal cross-app awareness is assumed. Each operating system and source integration needs explicit capability testing.


**Sources**

- E02


### native-chat: Native object-linked collaboration

Layer: experience | Status: later | Work package: S6

Gradually move useful operational discussion into conversations attached to a task, invoice or matter, while preserving WhatsApp participation during transition.


**Inputs**

- Authorised users and business-object references

- Messages and files


**Outputs**

- Scoped discussion events and acknowledgements


**Dependencies**

- identity

- observations

- tasks

- media


**Used By**

- agent-exchange


**Evidence**

Founder direction only. There is no evidence of a built team-chat service.


**Remaining**

- First test comments and acknowledgements on work objects

- Add notification, search, retention and delivery behaviour

- Only expand to broad chat after users choose it for repeated workflows


**Acceptance**

- A task discussion is visible only to its authorised participants

- A removed staff member loses access to both object and conversation


**Boundaries**

Do not make replacing WhatsApp a prerequisite for the first useful business loop.


**Sources**

- E02


### whatsapp: WhatsApp session connector

Layer: intake | Status: reported | Work package: S1

Turn the already reported online-session access into a reliable, observable source of messages and media for approved business groups.


**Inputs**

- Authorised linked-session events and selected groups

- Backfill, new messages and available edit/revoke/reply metadata


**Outputs**

- Normalised observations with original source keys

- Connection checkpoints, gap states and media-fetch jobs


**Dependencies**

- secrets

- identity

- observations

- media


**Used By**


**Evidence**

The founder reports that WhatsApp can be read through an online session and periodically supplied to the agent. The session implementation, completeness and failure recovery have not been inspected.


**Remaining**

- Audit the existing connector before choosing Baileys or whatsmeow

- Persist session credentials and key material securely and atomically

- Use one active worker lease per linked session; distinguish that from one device per account

- Capture history limits, edits, revokes, reply keys, reconnect reasons and identity mappings when available

- Expose missing history and media; support re-pairing by an authorised owner


**Acceptance**

- Replay duplicates, reconnects and out-of-order events without double admission

- A revoked session stops collection and alerts the owner

- Unavailable media creates an explicit gap instead of an invented fact


**Boundaries**

Group membership does not grant business action authority. Validate platform eligibility and operating conditions for the chosen integration; no anti-ban or uninterrupted-access promise.


**Sources**

- E01

- E02

- E03

- R02

- R03


### gmail: Gmail & email intake

Layer: intake | Status: reported | Work package: S1

Capture relevant emails and attachments, then recognise a continuing matter, a new matter or an ambiguous update before proposing work.


**Inputs**

- User-authorised mailbox access

- Provider message/thread identifiers and attachments


**Outputs**

- Email observations, attachment links and ingestion checkpoints


**Dependencies**

- identity

- secrets

- observations

- media


**Used By**

- calendar


**Evidence**

The founder describes Gmail integration as easy to connect. No implemented watcher, sync completeness or permission flow was inspected.


**Remaining**

- Choose scopes for read, draft and send capabilities separately

- Implement resumable sync and reconciliation for lost notifications or expired cursors

- Normalise court/matter identifiers without relying only on subject text

- Show mailbox access and reconnection status


**Acceptance**

- Repeated notifications do not create duplicate cases or tasks

- A missed interval can be reconciled with an explicit coverage result

- Two similarly named matters are held for review instead of merged


**Boundaries**

An email sender cannot authorise access to every matter. Treat email text and attachments as untrusted evidence.


**Sources**

- E02

- R04


### observations: Source event journal

Layer: intake | Status: partial | Work package: S1

Keep a durable account of what each source supplied, separately from the business meaning later assigned to it.


**Inputs**

- Connector payloads and original source identifiers

- Sent, received and stated event times


**Outputs**

- Append-only observation records

- Edit/revoke/correction links and checkpoint acknowledgements


**Dependencies**

- identity

- database


**Used By**

- native-chat

- whatsapp

- gmail

- media

- extraction


**Evidence**

The dossier uses source messages and structured intake/ledger processing. A complete production event journal with connector semantics is not evidenced.


**Remaining**

- Version the event envelope and preserve raw provider metadata under retention policy

- Separate sent_at, received_at and event_time; record unknown times

- Link edits and revokes without silently rewriting the audit history

- Commit intake checkpoints only after durable capture; retain gap markers


**Acceptance**

- The same source event replayed repeatedly is stored once logically

- An amendment remains traceable to the original

- A timezone or unknown event time is never silently guessed


**Boundaries**

Append-only audit design does not mean retaining personal data forever: deletion and retention must cover originals, derivatives, exports and backups.


**Sources**

- E01

- E03


### media: Media & document pipeline

Layer: intake | Status: proposed | Work package: S1

Make photos, voice notes, invoices and court documents usable evidence with accessible originals and precise references.


**Inputs**

- Attachment metadata, original bytes when available and per-sighting access scope


**Outputs**

- Stored originals, OCR or transcripts and page/time references

- Availability states and relationships to source events


**Dependencies**

- object-store

- identity

- observations


**Used By**

- native-chat

- whatsapp

- gmail

- extraction

- retrieval

- tasks

- portability


**Evidence**

The synthetic corpus contains multimedia and an unavailable delivery slip. Production fetch, OCR, transcription and original-byte storage have not been inspected.


**Remaining**

- Fetch under bounded retries; quarantine unsafe files and constrain parsers

- Store digest, MIME, size, source sighting and derivative version

- Keep unavailable, expired, failed and requested-again states explicit

- Use byte hashes to deduplicate storage while preserving every business/source association


**Acceptance**

- The same invoice forwarded to another outlet is not reassigned by hash equality

- Every extracted number can open the relevant original page or audio span

- Failed OCR cannot be mistaken for an empty or fully reviewed document


**Boundaries**

A byte hash establishes byte identity, not business ownership, invoice authority or semantic equivalence. Derivatives inherit source restrictions.


**Sources**

- E01

- E03


### identity: Directory, tenancy & roles

Layer: records | Status: proposed | Work package: S0–S1

Resolve who is speaking, which business or matter they belong to and what they may see or do. Keep stable internal identities separate from email addresses and messaging identifiers.


**Inputs**

- Workspace setup, memberships and explicit account-link decisions

- Source identifiers and role assignments


**Outputs**

- Actor IDs, organisation/outlet/matter scopes and revocation state


**Dependencies**

- database


**Used By**

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


**Evidence**

The dossier demonstrates identity ambiguity with two Ravi accounts and treats other-sender confirmations as context rather than authority. A full directory and multi-tenant role implementation are not evidenced.


**Remaining**

- Create business, outlet, person, membership and source-account tables

- Make ambiguous identity links correctable and auditable

- Represent accountant access to selected businesses and lawyer access to selected matters

- Revoke memberships, sessions, queued actions and derived access consistently


**Acceptance**

- Two people with the same display name remain distinct

- Removing a staff member blocks retrieval, downloads and later queued execution

- An accountant sees only explicitly shared scopes


**Boundaries**

Ownership of two businesses does not automatically make every staff member cross-business. Server checks must cover retrieval, APIs, media and exports.


**Sources**

- E01

- E02

- E03


### extraction: Typed extraction & entity matching

Layer: records | Status: partial | Work package: S2

Convert messages and documents into candidate business facts, preserving uncertainty rather than treating a plausible model answer as accepted state.


**Inputs**

- Scoped observations, attachments and known business entities

- Versioned extraction schemas


**Outputs**

- Candidate records with evidence references, unresolved fields and confidence signals


**Dependencies**

- observations

- media

- identity

- model-router


**Used By**

- ledger


**Evidence**

Latest reported AUTO-INTAKE RUN03 completed ten calls and captured several corrections, but missed the potato par value and CC-224. It still produced one material error and 0/3 strict-clean answers.


**Remaining**

- Measure candidate recall separately from final answer quality

- Distinguish new entity, amendment, duplicate and wrong-business forward

- Extract units, currency, dates and unknown fields using typed validation

- Keep correction and replacement chains in selected evidence


**Acceptance**

- The 20 kg par value and CC-224 are captured in the regression set

- A statement of intent never creates a completed task

- Unseen paraphrases, voice notes and invoice variants pass held-out checks


**Boundaries**

Confidence is not authority. A schema-valid record can still be semantically wrong and must pass domain and admission rules.


**Sources**

- E01


### ledger: Admission & business record ledger

Layer: records | Status: partial | Work package: S2

Separate proposed observations from accepted business state. Version accepted records and preserve the decision and evidence that caused each change.


**Inputs**

- Typed candidates, correction links and valid decision/grant references


**Outputs**

- Pending, accepted, rejected or superseded record versions

- Causal links and durable change events


**Dependencies**

- extraction

- policy

- database


**Used By**

- views

- retrieval

- output-validation

- decision-queue

- business-tools

- portability


**Evidence**

The dossier reports accept/reject/correct replay behaviour, R2 replacement handling and fixes for undated movements, ordering and duplicates. Current implementation was not independently inspected.


**Remaining**

- Formalise admissible transitions and database constraints

- Use optimistic concurrency for competing corrections

- Represent replacement, retraction and supersession explicitly

- Separate ingestion time from business event time in all derived calculations


**Acceptance**

- R2 supersedes the original invoice without a second liability

- An accepted undated stock movement blocks an exact stock answer until resolved

- Correcting a movement applies the adjustment exactly once


**Boundaries**

The model may propose a record; admission is enforced by deterministic rules and authorised decisions.


**Sources**

- E01


### views: Computed state & reconciliation

Layer: records | Status: partial | Work package: S2

Compute inventory, invoice state and outstanding work from admitted records. Return known, disputed and incomplete values distinctly.


**Inputs**

- Accepted record versions, cut-off times and unresolved dependencies


**Outputs**

- Inventory balances, discrepancies, payment states and freshness markers


**Dependencies**

- ledger

- database


**Used By**

- owner-app

- retrieval

- output-validation

- answers


**Evidence**

The known corpus tests 17.6 kg net tomatoes, the 19.45 kg potato discrepancy and a 12.5 kg issue already included in the sheet. Generalised production projections are not demonstrated.


**Remaining**

- Define units and deterministic calculations outside the model

- Rebuild views from versioned records and record the projection version

- Invalidate dependent answers and tasks when upstream facts change

- Show the cut-off and unresolved inputs alongside numerical results


**Acceptance**

- 32.7 − 13.25 = 19.45 kg; the included 12.5 kg issue is not subtracted again

- The later-than-cutoff events do not leak into the answer

- Rebuilding the same ledger yields the same current state


**Boundaries**

A materialised view is a convenience, not a second independent source of truth. Stale caches must be detectable.


**Sources**

- E01


### retrieval: Permission-aware evidence retrieval

Layer: runtime | Status: partial | Work package: S2–S5

Select the evidence needed for a specific business question while preserving amendments, holds and dependencies and excluding unauthorised content.


**Inputs**

- Question, actor scope, current business records and source index


**Outputs**

- Bounded context packet with source IDs and completeness flags


**Dependencies**

- identity

- ledger

- media

- views


**Used By**

- orchestrator

- output-validation

- answers


**Evidence**

The dossier context packet reached approximately 108.7 of 120 KB. Small citation tests passed, but no reliable large-history retrieval result is demonstrated.


**Remaining**

- Start with exact IDs, relational queries and full-text search

- Add semantic retrieval only for an observed recall need

- Retrieve dependency closure: original, replacement, correction, hold and latest state

- Filter permissions before retrieval and again before output; version caches


**Acceptance**

- Wrong-outlet evidence is excluded even when semantically similar

- A hold or retraction survives context reduction

- At three times history, compare critical-evidence recall and answer quality with full-history baseline


**Boundaries**

A vector database is an optional index, never the authoritative record store or an access-control boundary.


**Sources**

- E01

- E04


### orchestrator: Bounded agent orchestration

Layer: runtime | Status: partial | Work package: S2–S3

Run a finite reasoning/tool loop around a user request or workflow event, with explicit budgets, state and stop conditions.


**Inputs**

- Authenticated command or permitted trigger

- Evidence packet, workflow version and allowed capabilities


**Outputs**

- Answer, proposed business change or scheduled continuation

- Run trace and terminal/pending state


**Dependencies**

- policy

- retrieval

- model-router

- output-validation

- workflow-engine


**Used By**

- device-apps


**Evidence**

The dossier has extraction and answering runs plus adapter repairs. A complete durable multi-user production orchestrator is not evidenced.


**Remaining**

- Define request, run, step and workflow identifiers

- Bound model calls, tool calls, time and cost

- Persist transitions so workers can resume safely

- Hold only work that depends on an unresolved decision; let independent work continue


**Acceptance**

- A timeout produces a visible run state rather than a false success

- A pending payment approval does not stop unrelated inventory capture

- A resumed run cannot execute a completed side effect again


**Boundaries**

Evaluation-run rules and production recovery rules are different contracts. Historical no-retry evaluation runs remain failed even if production could recover.


**Sources**

- E01

- E03


### model-router: Model gateway & cost routing

Layer: runtime | Status: proposed | Work package: S3–S5

Make model providers replaceable through typed requests, capability checks and consistent outcomes. Use expensive reasoning only when measured task quality requires it.


**Inputs**

- Task type, sensitivity, budget and model capability requirements


**Outputs**

- Normalised model responses, usage and error categories


**Dependencies**

- secrets

- observability

- output-validation


**Used By**

- extraction

- orchestrator

- answers


**Evidence**

Several models were evaluated in the dossier. This shows comparative experiments, not a production routing layer or provider-independent quality.


**Remaining**

- Create provider adapters and normalise tool/JSON/streaming/error behaviour

- Version prompts and model configuration per run

- Benchmark routing on held-out episodes before enabling cheaper routes

- Define fallback rules that respect residency, sensitivity and budget constraints


**Acceptance**

- Switching a provider preserves the application contract and reruns the release suite

- Failures never appear as successful empty outputs

- Cost is measured per completed correct business outcome, including retries and review


**Boundaries**

LLM-independent means substitutable providers with tested contracts, not equal performance or zero provider dependence.


**Sources**

- E01

- E02


### output-validation: Output, evidence & invariant checks

Layer: runtime | Status: partial | Work package: S2

Check structure, arithmetic, evidence links, business invariants and completion state before presenting or admitting a model result.


**Inputs**

- Model response and selected source packet

- Domain invariants and expected output schema


**Outputs**

- Validated result or actionable failure/hold reason


**Dependencies**

- ledger

- views

- retrieval


**Used By**

- orchestrator

- model-router

- workflow-packs

- answers

- eval-harness


**Evidence**

The dossier reports an error:null adapter fix, strict/material grading differences and a citation mismatch later repaired on two tested answers.


**Remaining**

- Make parse failure, unsupported evidence and business conflict distinct errors

- Validate citations resolve to the exact supporting source version

- Check currency, unit and date consistency

- Require postcondition evidence for claims that an action completed


**Acceptance**

- A processing payment cannot be labelled paid

- A syntactically valid but unsupported answer is rejected or qualified

- Source citations remain valid after amendments and export


**Boundaries**

Passing JSON validation alone is not correctness. Model self-review cannot replace deterministic checks or held-out evaluation.


**Sources**

- E01


### workflow-packs: Versioned business workflow packs

Layer: runtime | Status: proposed | Work package: S2–S4

Package repeatable domain rules, schemas, prompts and tests without allowing production agents to silently change operating policy.


**Inputs**

- Restaurant or legal process definition

- Approved configuration and schemas


**Outputs**

- Versioned extraction, validation, action and evaluation bundles


**Dependencies**

- policy

- output-validation

- eval-harness


**Used By**

- eval-harness


**Evidence**

The conversation recommends reusable workflows. No reviewed workflow-pack registry or deployment mechanism is evidenced.


**Remaining**

- Define a manifest with version, schema, allowed tools and test suite

- Start with restaurant delivery/reconciliation and legal intake as distinct packs

- Record the pack version on every run

- Review, stage and roll back updates; use the project’s existing reviewer policy when confirmed


**Acceptance**

- A pack upgrade can replay the same fixtures and expose changed behaviour

- A proposed self-generated skill cannot become live without release review


**Boundaries**

Shared core does not mean identical business semantics. Court deadlines and restaurant stock rules require separate validation.


**Sources**

- E02

- E03

- E05


### answers: Grounded answers & owner briefs

Layer: runtime | Status: partial | Work package: S2

Explain current state in plain language with traceable evidence, relevant uncertainty and a clear next action for the owner.


**Inputs**

- Question, authorised current view and selected evidence


**Outputs**

- Answer or brief with source references, cut-off and limitations


**Dependencies**

- retrieval

- views

- output-validation

- model-router


**Used By**

- owner-app


**Evidence**

S2 achieved a 24/24 composite on returned known-test answers; later citation replay was 2/2. Fresh AUTO-INTAKE RUN03 remained 0/3 strict-clean, including one material error.


**Remaining**

- Keep the wording separate from deterministic quantities and status

- Let the owner open originals and correct the underlying record

- Build briefs from deltas and exceptions rather than retranscribing every chat

- Label missing media, incomplete intake and stale connectors


**Acceptance**

- An owner can trace every material number to a source or calculation

- The answer does not imply a task is complete from a promise to do it

- A brief reflects newly accepted corrections and preserves payment holds


**Boundaries**

The known-answer score is not an end-to-end reliability claim. Answer quality cannot compensate for missed intake.


**Sources**

- E01


### policy: Authority & grants engine

Layer: actions | Status: partial | Work package: S0–S3

Decide whether an actor may read, propose, approve or execute a specific action on a specific resource under current conditions.


**Inputs**

- Actor, tenant, object, action, exact parameters and resource version

- Current grants and standing policies


**Outputs**

- Allow, deny or hold decision with reason and policy revision


**Dependencies**

- identity

- database


**Used By**

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


**Evidence**

The dossier describes grants and tests source authority boundaries. Multi-tenant enforcement at every API/tool/storage boundary is not proven.


**Remaining**

- Define scoped grants and limited standing rules for routine work

- Enforce policy in services outside the model loop

- Recheck actor, object version, amount/recipient and grant validity at execution

- Deny by default when identity or authority is ambiguous


**Acceptance**

- An instruction embedded in an invoice cannot change grants

- A revoked approver cannot release an old queued action

- Changing a recipient or amount invalidates the old approval


**Boundaries**

A chat instruction, tool hook or group admin role is not a complete security boundary. Collection permission and execution permission are separate.


**Sources**

- E01

- E02

- E03

- R07


### decision-queue: Asynchronous decision queue

Layer: actions | Status: partial | Work package: S2–S3

Ask for human judgement only where a fact, scope or consequence needs it. Keep each decision understandable, bounded and attached to its evidence.


**Inputs**

- Held proposals, conflicting candidates and sensitive action requests


**Outputs**

- Accept, reject, correct or expired decisions

- Resumable dependency signals and audit events


**Dependencies**

- policy

- ledger

- identity


**Used By**

- owner-app


**Evidence**

The replay app reports pending-record decisions. A production queue with expiry, concurrency and action-specific revalidation is not evidenced.


**Remaining**

- Show what will change, why, exact scope and supporting originals

- Group related low-risk reviews without concealing per-item consequences

- Expire stale decisions and handle two reviewers acting concurrently

- Revalidate at execution and notify only the relevant person


**Acceptance**

- Changing an invoice after approval requires a fresh valid decision

- One held matter does not stall other workflows

- Two simultaneous accepts produce one committed result


**Boundaries**

Approval is scoped to an action and version. It is not a permanent blanket authorisation for future similar actions.


**Sources**

- E01

- E03


### tasks: Tasks, assignments & acknowledgements

Layer: actions | Status: proposed | Work package: S3

Turn a verified operational need into owned work with a due date, attachments, dependencies and an explicit completion signal.


**Inputs**

- Admitted records and authorised assignment decisions


**Outputs**

- Task records, assignees, reminders, acknowledgements and completion evidence


**Dependencies**

- identity

- policy

- workflow-engine

- media


**Used By**

- native-chat

- calendar

- portability


**Evidence**

The dossier tests that an intention such as “I’ll ask the chef” is not completion. No integrated task lifecycle is demonstrated.


**Remaining**

- Define proposed, assigned, acknowledged, in-progress, blocked and completed states

- Connect tasks to source record versions and matter/outlet scopes

- Update or review tasks when source facts or deadlines change

- Keep reminder preferences and escalation authority explicit


**Acceptance**

- An assignment contains the correct files and scoped access

- Completion needs an explicit permitted transition with evidence when required

- A changed hearing date flags dependent tasks and calendar entries


**Boundaries**

A task notification delivered is not the same as assignee acknowledgement or finished work.


**Sources**

- E01

- E02


### calendar: Calendar & deadline coordination

Layer: actions | Status: proposed | Work package: S4

Reflect verified operational dates in calendars and reminders while tracking later amendments and the source of every date.


**Inputs**

- Verified event time, timezone, matter/task and assignee availability when relevant


**Outputs**

- Proposed or created event, provider ID and linked revision


**Dependencies**

- tasks

- policy

- action-executor

- gmail


**Used By**


**Evidence**

Required by the Arkaj workflow. No calendar integration or court-date validation is evidenced.


**Remaining**

- Separate hearing dates from filing deadlines and internal preparation dates

- Require review for ambiguous or consequential legal dates

- Persist provider IDs and revision links for updates

- Handle timezone, rescheduling, cancellation and revoked calendar access


**Acceptance**

- An amended court email updates the right event after valid review

- A duplicate notice does not create a second hearing

- A partial task/calendar update remains visibly incomplete and recoverable


**Boundaries**

Do not infer binding legal deadlines from general knowledge or silently override the responsible lawyer’s review.


**Sources**

- E02


### business-tools: PDF, inventory & export tools

Layer: actions | Status: proposed | Work package: S3

Provide narrow, reliable common actions over accepted records so the business does not depend on a single assistant ecosystem for everyday outputs.


**Inputs**

- Typed action request, selected record versions and template


**Outputs**

- PDF, stock entry, task change or structured export plus receipt


**Dependencies**

- policy

- action-executor

- ledger

- object-store


**Used By**


**Evidence**

These are founder requirements and proposed capabilities. A complete tool service is not evidenced.


**Remaining**

- Implement PDF generation from validated structured data

- Expose typed stock adjustment and task operations rather than arbitrary shell access

- Start accounting exports with explicit field mapping and review

- Validate generated files and attach provenance and access restrictions


**Acceptance**

- A PDF total matches the admitted invoice version and opens correctly

- A repeated stock-entry request produces one logical entry

- An export excludes unauthorised fields and never includes credentials


**Boundaries**

Do not build a full accounting suite or claim compliance from a bookkeeping export. Payment execution is outside the first pilot.


**Sources**

- E02


### action-executor: Typed execution & causal receipts

Layer: actions | Status: proposed | Work package: S3

Execute approved actions through constrained adapters, record what caused them and distinguish requested, successful, failed and uncertain outcomes.


**Inputs**

- Action type, exact arguments, grant/decision, idempotency key and preconditions


**Outputs**

- Provider result, verified postcondition and receipt

- Retry, reconciliation or compensation requirement


**Dependencies**

- policy

- secrets

- workflow-engine

- database


**Used By**

- calendar

- business-tools

- agent-exchange


**Evidence**

The other discussion recommends causal action receipts. Production action execution and uncertain-outcome reconciliation are not evidenced.


**Remaining**

- Use an outbox or equivalent durable handoff with idempotent consumers

- Store cause record IDs, decision, policy version, arguments and result

- After a timeout, inspect provider state before retrying side effects

- Define compensating actions where reversal is possible; surface non-reversible outcomes


**Acceptance**

- A timeout after sending does not trigger an automatic duplicate send

- Every claimed success has a receipt and appropriate postcondition check

- A partial multi-step workflow is resumed or visibly escalated


**Boundaries**

Database transactions do not make remote services exactly-once. A queued request is not proof of an external effect.


**Sources**

- E03

- R01

- R06


### workflow-engine: Durable jobs, timers & recovery

Layer: actions | Status: proposed | Work package: S3

Persist long-running workflow state and scheduled work across restarts, worker crashes and delayed owner decisions.


**Inputs**

- Committed events, action outbox, timers and continuation requests


**Outputs**

- Leased jobs, attempts, next wake time and workflow state


**Dependencies**

- database

- observability


**Used By**

- orchestrator

- tasks

- action-executor


**Evidence**

The dossier reports network failures and restart tests of the replay app, not a complete background workflow service.


**Remaining**

- Begin with persisted jobs and leases if adequate

- Define retry/backoff budgets, dead-letter handling and operator replay

- Use timezones and business calendars explicitly

- Evaluate Temporal only when workflow complexity justifies operating it


**Acceptance**

- A worker killed between steps resumes without lost state or duplicate effects

- Overdue reminders remain visible and catch up predictably

- Failures have an owner and actionable recovery path


**Boundaries**

Do not copy a benchmark’s no-retry rule into all production operations. Safe recovery still needs side-effect protection.


**Sources**

- E01

- R06


### agent-exchange: Cross-business agent exchange

Layer: actions | Status: later | Work package: Later

Eventually let two explicitly authorised business workspaces exchange a bounded request or record, with receiving-side validation and human accountability.


**Inputs**

- Scoped delegation, object reference and approved recipient


**Outputs**

- Authenticated request, acknowledgement and causal receipt


**Dependencies**

- identity

- policy

- action-executor

- native-chat


**Used By**


**Evidence**

Founder vision; the CA distribution idea is a hypothesis from the second conversation, not validated demand or a built protocol.


**Remaining**

- First test accountant collaboration and exports without agent-to-agent infrastructure

- Define per-message capabilities, tenancy boundaries and revocation

- Add loop, budget and delegation-depth limits

- Validate commercial value before building a broad protocol


**Acceptance**

- A receiving agent rejects out-of-scope requests despite trusting the sender identity

- No agent can expand a delegated permission

- Repeated replies cannot create an unbounded action loop


**Boundaries**

Trust and privileges do not transfer automatically across organisations.


**Sources**

- E02

- E03


### database: Transactional business database

Layer: assurance | Status: proposed | Work package: S0–S1

Store identities, records, decisions, task state and durable jobs with constraints and reproducible migrations.


**Inputs**

- Validated transactional writes and versioned schemas


**Outputs**

- Consistent queries, committed versions and audit references


**Dependencies**


**Used By**

- observations

- identity

- ledger

- views

- policy

- action-executor

- workflow-engine

- object-store

- observability


**Evidence**

A prototype ledger exists in the dossier. The current production storage technology and migrations are unknown.


**Remaining**

- Inspect and preserve the existing database when suitable

- For a new service, evaluate PostgreSQL as the default relational store

- Enforce tenant scope and uniqueness at storage and service boundaries

- Define migrations, backup retention and recovery objectives


**Acceptance**

- Concurrent writes cannot violate record or idempotency invariants

- A backup is restored and the resulting state reconciles

- Service roles cannot bypass tenant boundaries unintentionally


**Boundaries**

Do not migrate just to match a diagram. Row policies require correct roles and tests; backups are not useful until restoration works.


**Sources**

- E01

- R05


### object-store: Originals, derivatives & artefact storage

Layer: assurance | Status: proposed | Work package: S1

Keep durable media and generated files separate from transactional rows while retaining ownership, provenance and access control.


**Inputs**

- Original files, OCR/transcript derivatives and generated artefacts


**Outputs**

- Versioned object IDs and short-lived authorised download references


**Dependencies**

- identity

- secrets

- database


**Used By**

- media

- business-tools

- portability


**Evidence**

Production object storage is not evidenced in the reviewed material.


**Remaining**

- Choose a managed object store with encryption and lifecycle rules

- Store relational metadata and scoped associations to each object

- Control signed-link lifetime and revocation behaviour

- Include originals and required derivatives in backup and portability design


**Acceptance**

- A user cannot fetch another matter’s attachment by guessing its object ID

- Retention jobs cover derived copies

- An export can resolve every included record’s authorised original


**Boundaries**

A file URL should not become a permanent bearer credential or a way around source permissions.


**Sources**

- E02

- E03


### secrets: Authentication, sessions & secrets

Layer: assurance | Status: proposed | Work package: S0–S1

Separate login, third-party account consent, linked-device keys and model/service credentials so one surface cannot expose every integration.


**Inputs**

- User sign-in, OAuth callbacks, connector pairing and service credentials


**Outputs**

- Short-lived sessions, encrypted credential references and revocation events


**Dependencies**

- identity


**Used By**

- device-apps

- whatsapp

- gmail

- model-router

- action-executor

- object-store

- sandbox


**Evidence**

Founder requests easier authentication management. No inspected implementation establishes token handling or device revocation.


**Remaining**

- Select an identity provider and use supported secure session patterns

- Validate OAuth state and supported PKCE flows; store refresh credentials server-side

- Store WhatsApp key material atomically with restricted encrypted access

- Rotate service credentials, redact logs and revoke on disconnect or offboarding


**Acceptance**

- Tokens do not appear in prompts, browser exports, traces or downloadable references

- An expired or revoked grant fails closed with a recoverable UX

- Reconnect cannot silently expand scopes


**Boundaries**

Encryption at rest is one control; access paths, logs, backups, runtime exposure and key ownership also matter.


**Sources**

- E02

- R04

- R07


### sandbox: Execution isolation & repair workflow

Layer: assurance | Status: proposed | Work package: S1–S3

Contain parsers, connector jobs and optional code execution so a malicious document or faulty repair cannot reach unrelated business data or credentials.


**Inputs**

- Scoped typed job and explicitly provided data


**Outputs**

- Limited result, logs and optional proposed patch


**Dependencies**

- policy

- secrets

- observability


**Used By**


**Evidence**

Sandboxing and connector repair are recommendations from the second discussion. No production isolation or automated repair flow is evidenced.


**Remaining**

- Prefer narrow APIs over general shell/browser control

- Apply least-privilege network and filesystem access with resource budgets

- Test connector changes against fixtures in an isolated environment

- Promote reviewed patches through release gates rather than self-repairing production


**Acceptance**

- A hostile attachment cannot invoke tools or read unrelated tenant files

- An unreviewed repair cannot receive production secrets or deploy itself

- The required provider endpoints work without broad unrestricted egress


**Boundaries**

A simplistic one-domain allowlist may break legitimate provider auth/CDN flows; scope tested endpoints deliberately. Containers alone are not a complete boundary.


**Sources**

- E03

- R01

- R07


### observability: Operational health & cost accounting

Layer: assurance | Status: proposed | Work package: S1–S5

Make missing intake, stuck approvals, uncertain actions, latency and unit cost visible to operators before the owner loses trust.


**Inputs**

- Connector checkpoints, run traces, action receipts and resource usage


**Outputs**

- Health dashboard, scoped alerts and per-workflow cost/latency metrics


**Dependencies**

- database


**Used By**

- model-router

- workflow-engine

- sandbox

- eval-harness


**Evidence**

The dossier has per-run scores, timing, costs and failure notes. Production monitoring, alert response and operational objectives are not evidenced.


**Remaining**

- Track connector lag and coverage, media failures and queue age

- Measure end-to-end completion and human review time

- Correlate observation, record, run, decision and action IDs

- Redact sensitive trace content; define operator access and incident response


**Acceptance**

- A disconnected source is visible before its stale data is described as current

- An alert can be traced to a specific recoverable job

- Unit cost includes model calls, failed attempts, storage, infrastructure and review effort


**Boundaries**

Low token cost is not low cost per correct completed workflow. Avoid logging private content just to simplify debugging.


**Sources**

- E01

- E03


### eval-harness: Evaluation harness & release gates

Layer: assurance | Status: partial | Work package: S0–S5

Measure whether changes improve the whole workflow, preserve invariants and work on unseen cases, independently of the production agent’s self-assessment.


**Inputs**

- Versioned fixtures, hidden expected outcomes and build/model/config versions


**Outputs**

- Stage scores, material errors, traces, regression comparison and release decision


**Dependencies**

- workflow-packs

- output-validation

- observability


**Used By**

- workflow-packs


**Evidence**

A meaningful synthetic harness exists: multiple model runs, strict/material grading, replay checks and citation tests. Fresh intake still fails; held-out production reliability is not established.


**Remaining**

- Freeze reproducible fixtures and receipt paths before changes

- Add stage-level evaluation, adversarial sequence tests and held-out episodes

- Keep answer quality separate from intake and execution completeness

- Define explicit gates and require the existing reviewer process when confirmed


**Acceptance**

- A release reproduces the known baseline before claiming an improvement

- Held-out episodes include identities, corrections, unknown times, revokes and side-effect uncertainty

- Run failures remain failures in reported denominators


**Boundaries**

Do not train to the 24 known questions and call it generalisation. Composite answered subsets are not successful end-to-end runs.


**Sources**

- E01

- R10


### portability: Export, retention & restoration

Layer: assurance | Status: proposed | Work package: S3–S5

Give the business a usable way to recover or leave: export records, evidence relationships, originals, tasks and decisions in open documented formats.


**Inputs**

- Authorised export scope and consistent data snapshot


**Outputs**

- Versioned archive, manifest, checksums and restoration report


**Dependencies**

- identity

- ledger

- media

- tasks

- object-store


**Used By**


**Evidence**

Portability is an adopted recommendation, not an inspected capability.


**Remaining**

- Design a versioned export manifest and stable IDs

- Exclude credentials and identify unavailable originals

- Define retention and deletion per data category and contractual need

- Test restore into a clean environment, including relationships and permissions


**Acceptance**

- Exported totals and relationships reconcile after restoration

- Secrets are absent from all archive entries

- Deletion follows the documented lifecycle for originals, derivatives and backups


**Boundaries**

A CSV of balances alone is not a portable business record. An immutable journal still needs lawful lifecycle controls.


**Sources**

- E02

- E03


## AI concepts mapped to this product


### Short-term memory

The bounded working context for one run: the request, selected evidence, tool results and current step. Durable checkpoints live outside the prompt.

Components: orchestrator, retrieval, workflow-engine

Boundary: Compacting a conversation must not erase a payment hold, a correction or an unresolved dependency.


### Long-term memory

Explicit, versioned business records, approved preferences, identity mappings and workflow knowledge. Historical observations remain distinguishable from accepted facts.

Components: ledger, identity, workflow-packs

Boundary: Do not treat a model-written summary or a vector search result as the authoritative ledger. Preference changes need scope, provenance and revocation.


### Planning

Choose the next permitted step, record its dependencies and revise the plan when evidence changes. Use predictable workflow steps for repeated business processes.

Components: orchestrator, workflow-packs, tasks

Boundary: A plan is an intention. It is not an approval, execution receipt or completed task.


### RAG / retrieval

Retrieve authorised records and source evidence before generating an answer. Exact business identifiers and amendment relationships matter alongside semantic similarity.

Components: retrieval, answers, output-validation

Boundary: RAG helps answer from evidence; it does not provide ingestion completeness, permission enforcement or reliable execution by itself.


### Embeddings & vector index

An optional derived search representation for finding semantically related text or media. Add it when measured retrieval needs justify it.

Components: retrieval, media, database

Boundary: The index must inherit scope, deletion and version rules. It is rebuildable from governed data and is not the source of truth.


### MCP / tool protocol

An optional standard interface for exposing tools and resources to a model runtime. Typed service APIs can also be used directly.

Components: business-tools, action-executor, policy

Boundary: Protocol compatibility does not grant authority. Authenticate the caller, validate arguments and enforce object scope in the executing service.


### Multi-agent coordination

Separate workers or specialists may handle bounded tasks when evaluation shows a benefit. Share typed state and causal references, not unchecked conversation summaries.

Components: orchestrator, model-router, agent-exchange

Boundary: Do not add multiple agents by default. Delegation needs scopes, budgets, loop limits and receiving-side validation.


### Authentication versus authorisation

Authentication establishes the person, device or service identity. Source consent grants specific connector access. Authorisation decides which exact business object and action that identity may use.

Components: secrets, identity, policy, decision-queue

Boundary: Signing in, linking WhatsApp or granting Gmail read access does not authorise sending messages, approving invoices or accessing every matter.


## Harness: runtime versus evaluation

The runtime harness governs live work. The evaluation harness independently measures a version against fixtures, invariants and held-out outcomes. A good score does not execute work; a successful tool response does not prove business correctness.


### h-context: Context builder

Runtime: Loads only permitted records and the evidence needed for this request, including correction and hold chains.

Evaluation: Does the selected packet retain critical evidence when history grows?

Solves: Missing context, cross-tenant leakage and oversized prompts.

Components: retrieval, identity, media


### h-state: Run state & checkpoints

Runtime: Persists step IDs, state, budgets, decisions and continuation points outside model memory.

Evaluation: Can a killed worker resume without losing state or repeating an effect?

Solves: Fragile in-memory agents and forgotten work after restart.

Components: orchestrator, workflow-engine


### h-model: Provider adapter

Runtime: Translates a typed request into a selected model’s API and normalises errors, usage and results.

Evaluation: Does a provider change preserve schema and held-out task quality?

Solves: Provider coupling and false success from malformed responses.

Components: model-router


### h-tools: Tool registry & contracts

Runtime: Exposes narrowly typed capabilities with argument schemas and declared side effects.

Evaluation: Are invalid units, recipients and resource IDs refused before execution?

Solves: Unbounded tools and ambiguous actions.

Components: business-tools, action-executor


### h-authority: Policy gate

Runtime: Checks current actor, action, object, parameters and grants at service boundaries.

Evaluation: Can a supplier message, old approval or revoked user gain authority?

Solves: Confusing persuasive text with permission.

Components: policy, identity


### h-validation: Result validation

Runtime: Checks typed output, arithmetic, citations and business invariants.

Evaluation: Does an unsupported or contradictory claim become a visible failure?

Solves: Well-written answers with wrong facts or unproven completion.

Components: output-validation, views


### h-review: Human decision boundary

Runtime: Parks a bounded proposal with evidence, expiry and impact; resumes dependent work after revalidation.

Evaluation: Do concurrent decisions or changed records invalidate stale approvals?

Solves: Approval fatigue and stalled unrelated work.

Components: decision-queue, policy


### h-recovery: Retries & reconciliation

Runtime: Retries safe reads within budget; checks remote state before repeating uncertain side effects.

Evaluation: What happens when a send succeeds but its response is lost?

Solves: Duplicate messages, entries and calendar events.

Components: workflow-engine, action-executor


### h-skill: Versioned workflow knowledge

Runtime: Uses reviewed business schemas, prompts and procedures with explicit versions.

Evaluation: Does an updated procedure preserve the regression suite and pass unseen cases?

Solves: Unreviewed self-modification and invisible policy drift.

Components: workflow-packs


### h-trace: Tracing & budgets

Runtime: Records causal IDs, outcome, time and cost with sensitive content redacted.

Evaluation: Can each failure and dollar be attributed to a business outcome?

Solves: Opaque failures and misleading per-call economics.

Components: observability, action-executor


## Workflow: Restaurant operations

Varun · owner of Forefathers and Concu

Illustrative target workflow using the dossier’s known test cases. It is not an implemented end-to-end demo.

1. **Capture → Source observation**: A delivery message and invoice arrive in the approved outlet group. Store the source key, sender, times and media availability; do not treat the group name alone as invoice ownership. Components: whatsapp, observations, media.

2. **Understand → Candidate record**: Extract the delivery, outlet, items and units. Link the later 17.6 kg net tomato correction to the candidate delivery only when the evidence supports the relationship. Components: extraction, identity.

3. **Resolve → Accepted / held**: R2 replaces the earlier FF invoice. The Concu invoice forwarded to Forefathers stays associated with Concu. Ambiguous identity or replacement goes to the owner. Components: ledger, decision-queue, policy.

4. **Compute → Reconciled view**: Compare the 32.7 kg sheet figure with the 13.25 kg physical count: a 19.45 kg gap. The 12.5 kg issue is already in the sheet, so it must not be subtracted again. Components: views, output-validation.

5. **Coordinate → Assigned work**: Create a permitted discrepancy task for the responsible person with the source evidence. “I’ll ask the chef” is a follow-up intention, not task completion. Components: tasks, action-executor.

6. **Explain & revise → Grounded answer**: Answer the owner with source links, cut-off and missing evidence. FF-781 R2 ₹2,099.20 remains processing and the no-second-transfer hold survives. A later correction invalidates affected views. Components: answers, views, observability.


## Workflow: Law-chamber coordination

Arkaj · principal; Ramya · legal assistant and operations lead

Founder scenario. Every step below is a target capability; production legal workflow is not evidenced.

1. **Capture → Email observation**: The principal’s authorised mailbox receives a court update. Persist the message and attachment references, with a sync checkpoint and matter-access scope. Components: gmail, observations, media.

2. **Match matter → Proposed matter link**: Extract court, matter number, parties and date. Compare with existing matters; classify as amendment, new matter or ambiguous match. Similar subject lines do not justify an automatic merge. Components: extraction, identity, ledger.

3. **Review → Verified update**: Ramya reviews uncertain matches and consequential dates against the original notice. The principal’s mailbox access does not grant every support worker access to all cases. Components: decision-queue, policy.

4. **Assign → Assigned / acknowledged**: Propose or create the permitted task with responsible staff, internal due date and the correct file versions. Delivery and acknowledgement are tracked separately. Components: tasks, media, action-executor.

5. **Schedule → Scheduled / partial**: Create or update a linked calendar event using the verified date and timezone. A calendar failure after task creation leaves a recoverable partial state, not a completed workflow. Components: calendar, workflow-engine.

6. **Follow changes → Revised with audit trail**: A later court amendment links to the same matter, marks dependent work for review and updates authorised assignees. Retain the prior version and the decision that changed it. Components: ledger, tasks, answers, observability.


## Workflow: When something goes wrong

Owner + operations service

Required failure scenario for the target action system; not a reported passing test.

1. **Authorise → Approved proposal**: An owner approves a precise task update or notification for a specific recipient and record version. Store the current policy decision. Components: policy, decision-queue.

2. **Persist → Queued action**: Commit an action request and unique idempotency key before handing it to a worker. Store the cause record and decision IDs. Components: database, action-executor.

3. **Execute → Outcome uncertain**: Recheck current grants and preconditions, then call the adapter. The provider may complete the action before the connection drops. Components: action-executor, secrets.

4. **Reconcile → Reconciling**: Inspect the provider using its object or request identifier. Do not repeat the action just because the response was lost. If no safe check exists, escalate the ambiguity. Components: workflow-engine, action-executor.

5. **Receipt → Verified outcome**: Record confirmed success, confirmed failure or unresolved outcome with its evidence. Never label “request sent” as “work completed.” Components: action-executor, observability.

6. **Inform → Visible recovery**: Show the owner the actual result and any remaining step. Independent workflows continue while this one waits. Components: owner-app, orchestrator.


## Evidence register


### Known-answer composite

- id: T01

- label: Known-answer composite

- value: 24 / 24

- status: demonstrated

- detail: S2 combines 9 + 15 returned answers on known questions. Stopped batch runs remain failed. This is not a clean single production run or a generalised accuracy rate.

- source: E01


### Latest fresh-intake answers

- id: T02

- label: Latest fresh-intake answers

- value: 0 / 3

- status: partial

- detail: AUTO-INTAKE RUN03: ten calls completed, but par 20 and CC-224 were missed. One answer had a material error; the other two had strict gaps. Latest output was CLI, not app.

- source: E01


### Citation replay

- id: T03

- label: Citation replay

- value: 2 / 2

- status: demonstrated

- detail: Two known answers were strict-clean; 16/16 supporting native citations. $1.126136 total and 65.5 / 85.6 seconds. Tiny sample; not a latency or cost service guarantee.

- source: E01


### Context packet

- id: T04

- label: Context packet

- value: 108.7 KB

- status: partial

- detail: Approximately 108.7 of a 120 KB packet budget. Evidence selection and growing-history tests are needed before scaling the history.

- source: E01


### Replay & correction behaviour

- id: T05

- label: Replay & correction behaviour

- value: Narrow pass

- status: demonstrated

- detail: Accept / reject / correct and restart behaviour reported. Undated movement handling, identity authority, duplicates and ordering required fixes. No independent rerun here.

- source: E01


### Live connectors

- id: T06

- label: Live connectors

- value: Reported

- status: reported

- detail: WhatsApp online-session reading is founder-reported. Gmail is described as straightforward. Neither completeness nor recovery was independently verified.

- source: E02


## Roadmap


### Establish the truth

- id: S0

- title: Establish the truth

- outcome: A reproducible baseline and a build map that matches the code.

- deliverables: Locate current repositories, schema, prompts, tests and receipt files, Reproduce known results with pinned versions and explicit denominators, Map current auth, storage and trust boundaries; confirm reviewer policy

- gate: Every “built” claim links to code plus a reproducible check; gaps are logged.

- depends: 

- not_yet: No framework rewrite or calendar promise before the audit.


### Reliable capture & identity

- id: S1

- title: Reliable capture & identity

- outcome: Approved sources arrive durably and gaps are visible.

- deliverables: Harden existing WhatsApp and Gmail adapters, Directory, scoped login, connector consent and secrets, Original media storage, observation envelopes, checkpoints and health

- gate: Duplicate, reconnect, revoke, unknown-time and unavailable-media cases pass; unauthorised access is denied.

- depends: S0

- not_yet: Do not claim complete history unless measured.


### Finish one restaurant loop

- id: S2

- title: Finish one restaurant loop

- outcome: A fresh message becomes an accepted record and a correct owner answer inside the app.

- deliverables: Close missed par and invoice intake cases, Connect review decisions, ledger corrections, computed views and citations, Run the full delivery → discrepancy → correction → answer loop

- gate: No critical error in the agreed release suite; unseen episodes pass the agreed quality threshold; restart preserves state.

- depends: S1

- not_yet: Avoid broad multi-agent orchestration.


### Make work happen safely

- id: S3

- title: Make work happen safely

- outcome: Assignments and common tools execute with receipts and recovery.

- deliverables: Task lifecycle, reminders, asynchronous decisions and outbox, PDF / stock tools, typed action adapters and uncertain-outcome recovery, Export manifest and an initial restore test

- gate: Side-effect timeout, duplicate execution, stale approval and partial-success drills pass.

- depends: S2

- not_yet: Payment execution and full accounting remain outside the initial scope.


### Validate the shared core in legal work

- id: S4

- title: Validate the shared core in legal work

- outcome: Court email → matter → reviewed assignment → linked calendar update.

- deliverables: Matter schema and matching rules, Consequential-date review, scoped files and assignments, Amendment propagation through tasks and calendar

- gate: Wrong-matter, duplicate notice, ambiguous date, restricted file and later-amendment cases pass with the responsible team.

- depends: S3

- not_yet: Do not infer legal obligations without the designated reviewer.


### Pilot, measure & harden

- id: S5

- title: Pilot, measure & harden

- outcome: Consented real workflows establish value, reliability and unit cost.

- deliverables: Held-out episode evaluation and a small monitored pilot, Measure review time, completion, latency, coverage and successful-task cost, Permission probes, restore drill, retention, incident response and load tests

- gate: Pilot acceptance criteria are agreed before launch and met over a stated observation window.

- depends: S2, S3

- not_yet: No percentage uplift claim without paired evidence; S4 can validate a second domain separately.


### Expand the useful surfaces

- id: S6

- title: Expand the useful surfaces

- outcome: Add native device features and collaboration where they measurably improve repeated work.

- deliverables: Voice, device notifications and local connector packaging where needed, Object-linked chat and accountant collaboration, Consider cross-business agents after scoped collaboration works

- gate: Each surface has a specific user need and measured adoption or workflow benefit.

- depends: S5

- not_yet: A complete WhatsApp replacement is not the MVP gate.


## Architecture decisions


### Runtime location

- topic: Runtime location

- choice: Cloud owns durable workflow state; device connectors are optional.

- reason: Matches the founder’s clarified deployment direction and supports work while a device is offline.

- state: Direction

- revisit: Data residency, latency or customer constraints require a different deployment.


### Harness investment

- topic: Harness investment

- choice: Keep and strengthen the current harness; connect it to an end-to-end workflow.

- reason: Existing tests expose meaningful errors. The risk is overfitting known questions, not the existence of a harness.

- state: Recommendation

- revisit: The source audit reveals an unmaintainable or incompatible core.


### Agent count

- topic: Agent count

- choice: Start with one bounded orchestrator and typed workflow steps.

- reason: More agents add handoffs and cost before the intake and state semantics are reliable.

- state: Recommendation

- revisit: A measured specialist improves a specific failure class without unacceptable cost or latency.


### Storage

- topic: Storage

- choice: Reuse sound existing storage; prefer relational state plus object storage for a new service.

- reason: Records, permissions and causal links need transactions; media needs durable bytes.

- state: Provisional

- revisit: The audit establishes another suitable technology already in use.


### Retrieval

- topic: Retrieval

- choice: Exact IDs and full-text first; add semantic indexing when it solves observed misses.

- reason: An invoice correction or hold is a relationship problem as well as a similarity problem.

- state: Recommendation

- revisit: Measured evidence recall requires semantic retrieval.


### OpenHands / Hermes

- topic: OpenHands / Hermes

- choice: Optional components or design references; neither is a required product foundation.

- reason: Adoption should satisfy isolation, licensing, provider and upgrade contracts, rather than determine business semantics.

- state: Provisional

- revisit: A bounded evaluation shows lower total engineering and operating cost.


### Permissions

- topic: Permissions

- choice: Request access for enabled capabilities, with separately scoped actions.

- reason: “Maximum awareness” should mean approved useful coverage, not maximum standing authority.

- state: Recommendation

- revisit: A specific workflow needs a clearly explained additional scope.


### Native chat & CA channel

- topic: Native chat & CA channel

- choice: Validate object-linked collaboration and accountant access before building an agent network.

- reason: Distribution and migration hypotheses need actual user evidence.

- state: Later

- revisit: Pilot partners repeatedly request cross-business structured exchange.


## Proposed data contracts


### Observation

- name: Observation

- id: observation

- purpose: What a source actually supplied.

- fields: observation_id, tenant_id, source_account_id, source_event_id, source_container_id, actor_ref, event_type, sent_at, received_at, event_time|null, reply_to|null, supersedes|null, media_refs[], access_scope, raw_payload_ref, schema_version

- rule: Provider event IDs are scoped by account/container. Unknown event time stays unknown. Source content never becomes an instruction by itself.


### Business record

- name: Business record

- id: record

- purpose: A proposed or admitted business fact.

- fields: record_id, tenant_id, business_id, object_type, object_id, version, status, typed_fields, evidence_refs[], supersedes_version|null, decision_ref|null, effective_at|null, created_at

- rule: Versions preserve amendment history. Only admitted records affect authoritative projections under defined rules.


### Decision

- name: Decision

- id: decision

- purpose: Who authorised which precise change.

- fields: decision_id, proposal_id, actor_id, scope, action_type, parameters_digest, resource_version, outcome, reason, policy_revision, expires_at, created_at

- rule: A changed action, object version or revoked grant triggers revalidation; expiry is not approval.


### Action & receipt

- name: Action & receipt

- id: action

- purpose: A typed external effect and its observed outcome.

- fields: action_id, tenant_id, action_type, arguments, idempotency_key, cause_refs[], decision_ref, policy_revision, preconditions, attempts[], provider_ref|null, outcome, postcondition_evidence[]

- rule: Queued, executing, succeeded, failed and uncertain are distinct. Verify external state before retrying an uncertain side effect.


### Task / matter links

- name: Task / matter links

- id: task

- purpose: Work that evolves with its source.

- fields: task_id, tenant_id, business_or_matter_id, source_record_versions[], assignee_ids[], status, due_at|null, timezone, attachments[], dependencies[], acknowledged_at|null, completion_evidence[]

- rule: Changing a source date invalidates or reviews affected work; a notification is not an acknowledgement or completion.


## Risks and controls


### Missed facts at intake

- risk: Missed facts at intake

- consequence: A polished answer can still be materially wrong.

- control: Stage-level candidate recall, source coverage and held-out messages.

- components: extraction, eval-harness


### Correction or hold omitted

- risk: Correction or hold omitted

- consequence: Double counting, wrong balances or an unsafe follow-up.

- control: Versioned relationships, dependency retrieval and deterministic projection tests.

- components: ledger, retrieval, views


### Cross-business / matter exposure

- risk: Cross-business / matter exposure

- consequence: Staff or another tenant sees private records or files.

- control: Identity scopes at query, storage, media, tool and export boundaries; revocation tests.

- components: identity, policy, object-store


### Prompt injection in a message or document

- risk: Prompt injection in a message or document

- consequence: Untrusted content attempts to invoke tools, reveal secrets or change rules.

- control: Separate data from authority; deterministic service gates, scoped tools and isolation.

- components: policy, sandbox, secrets


### Side effect succeeds before timeout

- risk: Side effect succeeds before timeout

- consequence: Retry creates a duplicate notification, entry or calendar event.

- control: Idempotency where supported, durable receipts and provider reconciliation.

- components: action-executor, workflow-engine


### Silent connector or media gap

- risk: Silent connector or media gap

- consequence: The owner believes incomplete information is current.

- control: Coverage states, last successful sync, attachment availability and actionable alerts.

- components: whatsapp, gmail, media, observability


### Stale approval or departed employee

- risk: Stale approval or departed employee

- consequence: Previously allowed work executes after authority or facts change.

- control: Execution-time checks, exact parameters, record versions and membership revocation.

- components: decision-queue, policy, identity


### Cost and latency accumulate

- risk: Cost and latency accumulate

- consequence: An affordable model call becomes an expensive business workflow.

- control: Deterministic computation, bounded context, batching and outcome-level cost accounting.

- components: model-router, views, observability


## Measurement plan — targets, not forecasts


### Intake completeness

- name: Intake completeness

- definition: Critical expected facts captured / critical facts in labelled episodes; also report false critical candidates.

- baseline: Known misses include par 20 and CC-224. General rate unknown.

- gate: Proposed target: halve missed critical facts against the frozen baseline without increasing false critical candidates.


### End-to-end correctness

- name: End-to-end correctness

- definition: Episodes with correct intake, state, answer and intended action / all attempted episodes.

- baseline: No validated production baseline. Latest fresh-intake answer check: 0/3 strict-clean.

- gate: Zero critical errors in the agreed release suite; held-out threshold and observation window must be agreed before pilot.


### Evidence recall at scale

- name: Evidence recall at scale

- definition: Required supporting and constraining evidence retrieved / all labelled required evidence.

- baseline: Packet around 108.7 / 120 KB. Large-history recall unknown.

- gate: Proposed experiment at 3× history: ≥98% critical evidence recall, no missed critical holds/corrections and no answer regression.


### Owner effort

- name: Owner effort

- definition: Review minutes and manual decisions per completed comparable workflow.

- baseline: Measure in pilot before automation.

- gate: Proposed target: ≥25% less review time and ≥30% fewer manual decision actions, with quality preserved.


### Outcome cost

- name: Outcome cost

- definition: Model, infrastructure, storage, failed attempts and human review cost / correctly completed workflows.

- baseline: Citation replay cost is a tiny test sample, not unit economics.

- gate: Proposed routing target: ≥25% lower cost, no new critical errors and ≤2 percentage-point completion decrease on paired tests.


### Latency & freshness

- name: Latency & freshness

- definition: Median and tail time to useful state and completed work, plus age/coverage of each source.

- baseline: Two citation responses took 65.5 and 85.6 seconds. No general service baseline.

- gate: Proposed cached-state target: <2 seconds for a fresh state card; separately measure generation and external action latency.


## Sources


### S04 Owner Assistant dossier

- id: E01

- title: S04 Owner Assistant dossier

- kind: Reviewed project narrative

- url: https://claude.ai/artifact/EK5M79vRnjpEcxuQvUXj6v

- note: 167 synthetic messages and displayed grading criteria reviewed previously. Underlying attachment bytes, source code and original receipts were not audited. Latest timeline takes precedence over stale summary sections.


### Founder requirements in this conversation

- id: E02

- title: Founder requirements in this conversation

- kind: First-party requirements / reported capability

- url: None

- note: Restaurant and law-chamber examples; WhatsApp online-session access reported working; cloud runtime, device apps, model independence and eventual native chat requested.


### Supplied second-LLM conversation

- id: E03

- title: Supplied second-LLM conversation

- kind: Proposal, not implementation evidence

- url: None

- note: Pasted text reviewed. Directory, causal receipts, queued decisions and portability adopted as recommendations. Home-node requirement, effort percentages and unproven corpus links are not accepted as facts.


### Supplied RAG / agent architecture image

- id: E04

- title: Supplied RAG / agent architecture image

- kind: Visual inspiration

- url: None

- note: Used to distinguish retrieval, orchestration and tools. It is not the SupaBiz architecture or evidence that multi-agent RAG is needed.


### Hermes Agent skills video

- id: E05

- title: Hermes Agent skills video

- kind: Design inspiration

- url: https://www.youtube.com/watch?v=WJgxX0Eib6k&t=35s

- note: Transcript reviewed previously. Useful themes: durable progress, selected context and versioned skills. The video’s performance claims do not establish SupaBiz improvements.


### OpenHands SDK architecture

- id: R01

- title: OpenHands SDK architecture

- kind: Technical reference

- url: https://docs.openhands.dev/sdk/arch/overview

- note: Evaluate action / observation and sandbox patterns. Not a decision to adopt its runtime.


### Baileys repository

- id: R02

- title: Baileys repository

- kind: Connector candidate

- url: https://github.com/WhiskeySockets/Baileys

- note: TypeScript candidate. Verify chosen release, capabilities and licence before implementation; preserve the existing connector if adequate.


### whatsmeow repository

- id: R03

- title: whatsmeow repository

- kind: Connector candidate

- url: https://github.com/tulir/whatsmeow

- note: Go candidate; MPL-2.0 differs from a blanket permissive-licence claim.


### Gmail API scopes

- id: R04

- title: Gmail API scopes

- kind: Technical reference

- url: https://developers.google.com/workspace/gmail/api/auth/scopes

- note: Select scopes per enabled feature; assess applicable verification requirements before distributing the integration.


### PostgreSQL row security

- id: R05

- title: PostgreSQL row security

- kind: Technical reference

- url: https://www.postgresql.org/docs/current/ddl-rowsecurity.html

- note: Database enforcement is one layer; configure and test service roles and privileged bypass paths.


### Temporal workflows

- id: R06

- title: Temporal workflows

- kind: Optional infrastructure reference

- url: https://docs.temporal.io/workflows

- note: Durable workflow option if timers and multi-step recovery outgrow a simpler persisted worker.


### OWASP AI agent security

- id: R07

- title: OWASP AI agent security

- kind: Technical reference

- url: https://cheatsheetseries.owasp.org/cheatsheets/AI_Agent_Security_Cheat_Sheet.html

- note: Use alongside action authority, isolation and data-access tests; no framework label guarantees security.


### Hermes Agent repository

- id: R08

- title: Hermes Agent repository

- kind: Framework reference

- url: https://github.com/NousResearch/hermes-agent

- note: Study gateway and skill patterns. Adoption requires a contract-based evaluation.


### OpenClaw security advisories

- id: R09

- title: OpenClaw security advisories

- kind: Failure-mode reference

- url: https://github.com/openclaw/openclaw/security/advisories

- note: Advisories span authorisation, secrets, isolation and other controls; they are not all one missing-grant problem.


### Stateful testing with Hypothesis

- id: R10

- title: Stateful testing with Hypothesis

- kind: Testing reference

- url: https://hypothesis.readthedocs.io/en/latest/stateful.html

- note: Generate sequences such as accept, correct, revoke, replay and restart to check invariants.


## Open decisions

- Where are the current source repository, database schema, test fixtures and raw receipts?

- Which WhatsApp session/library and hosting arrangement are actually in use, and what is its measured history/media coverage?

- Which customer and one operational workflow will be the first consented pilot?

- Which actions may run under standing rules, and which require an owner, accountant or responsible lawyer?

- What retention, deployment region, recovery and contractual requirements do pilot customers need?

- What team capacity and stack already exist? Sprint labels are work packages, not promised two-week delivery dates.


## Maintenance

Change canonical content, preserve stable IDs, add dated evidence and limitations, regenerate all views and verify. Do not change reported/proposed to demonstrated without evidence.

Human and AI files are generated from the same canonical content. Stable component IDs link dependencies and workflows. No credentials, raw customer messages or executable instructions are included.
