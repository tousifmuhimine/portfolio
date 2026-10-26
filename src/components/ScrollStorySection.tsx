'use client';

import { useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import {
  BrainCircuit,
  Bot,
  Server,
  Activity,
  ArrowRight,
  CheckCircle2,
  Terminal,
} from 'lucide-react';
import SectionReveal from './SectionReveal';
import WordReveal from './WordReveal';

const storyChapters = [
  {
    id: '01',
    category: 'REASONING & LLMS',
    shortCategory: 'LLMs',
    title: 'I DO // Fine-Tuning & Multi-Step Reasoning',
    tagline: 'Moving beyond naive prompting to verifiable model intelligence.',
    icon: BrainCircuit,
    color: '#3df5ff',
    telemetry: 'ACCURACY_BOOST: +15% // BENCHMARK: GSM8K // BASELINE: GEMMA-3:4B',
    points: [
      'Supervised instruction tuning on open-source foundation models for complex mathematical reasoning.',
      'Rigorous benchmark-driven evaluation against Mathstral and Gemini baselines.',
      'Custom dataset curation and iterative loss optimization yielding 15% verifiable reasoning gain.',
    ],
    codeSnippet: `def fine_tune_reasoning_node():
    model = AutoModelForCausalLM.from_pretrained(
        "google/gemma-3-4b"
    )
    lora_config = LoraConfig(
        r=16, lora_alpha=32, target_modules=["q_proj", "v_proj"]
    )
    trainer = SFTTrainer(
        model=model, train_dataset=gsm8k_curated, eval_dataset=benchmark_eval
    )
    # Output: +15% Reasoning Accuracy on GSM8K`,
    projectRef: 'PorteHobe AI Capstone',
  },
  {
    id: '02',
    category: 'AGENTS & RETRIEVAL',
    shortCategory: 'Agents',
    title: 'I DO // Autonomous Agents & Grounded RAG',
    tagline: 'Giving models deterministic memory, external tools, and validation loops.',
    icon: Bot,
    color: '#c8ff3d',
    telemetry: 'PROTOCOL: MCP SERVER // RETRIEVAL: PGVECTOR // AGENTS: LANGGRAPH',
    points: [
      'Architecting cyclic agentic workflows and stateful graphs with LangGraph and LangChain.',
      'Implementing Model Context Protocol (MCP) servers for seamless tool execution and retrieval.',
      'Building zero-hallucination vector search pipelines with PGVector and semantic embeddings.',
    ],
    codeSnippet: `workflow = StateGraph(AgentState)
workflow.add_node("retrieve_vector_context", pgvector_query)
workflow.add_node("reason_with_mcp_tools", mcp_executor)
workflow.add_edge("retrieve_vector_context", "reason_with_mcp_tools")
workflow.add_conditional_edges(
    "reason_with_mcp_tools", should_continue
)`,
    projectRef: 'DSA Learning LLM & Physics RAG',
  },
  {
    id: '03',
    category: 'FULL-STACK SYSTEMS',
    shortCategory: 'Full-Stack',
    title: 'I DO // Resilient Backend & Full-Stack Apps',
    tagline: 'Transforming AI logic into production-grade, secure, fast applications.',
    icon: Server,
    color: '#3df5ff',
    telemetry: 'FRAMEWORKS: NEXT.JS + FASTAPI // DB: POSTGRESQL // AUTH: JWT RBAC',
    points: [
      'Designing high-concurrency RESTful APIs and streaming endpoints in FastAPI and Node.js.',
      'Structuring relational schemas, ACID transactions, and role-based access control in PostgreSQL.',
      'Crafting reactive, low-latency web interfaces with React, Next.js, and modern animation stacks.',
    ],
    codeSnippet: `@app.post("/api/v1/reason/stream")
async def stream_reasoning(request: PromptRequest, user: User = Depends(auth_guard)):
    session = await vector_store.create_session(user.id)
    return StreamingResponse(agent.stream_tokens(request.query, session=session))`,
    projectRef: 'Bouncy Book Store & FabricoMartBD',
  },
  {
    id: '04',
    category: 'PREDICTIVE ML',
    shortCategory: 'ML / DL',
    title: 'I DO // Predictive Modeling & Multimodal DL',
    tagline: 'Engineering stability out of raw environmental and temporal tensors.',
    icon: Activity,
    color: '#c084fc',
    telemetry: 'METRIC: 90% ACCURACY // DATA: TIME SERIES & CNN // DOMAIN: FLOOD & EMOTION',
    points: [
      'Engineering features from localized geographic and meteorological datasets for flood forecast stability.',
      'Achieving 90% predictive accuracy using supervised time-series and ensemble regressors.',
      'Architecting CNNs and sequence models for multimodal emotion sentiment extraction from video tensors.',
    ],
    codeSnippet: `model = Sequential([
    Conv2D(64, kernel_size=(3, 3), activation='relu', input_shape=frame_shape),
    TimeDistributed(LSTM(128, return_sequences=True)),
    Dense(num_sentiment_classes, activation='softmax')
]) # Multi-modal temporal sentiment classifier`,
    projectRef: 'Flood Forecasting AI & Multimodal Sentiment',
  },
];

export default function ScrollStorySection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ['-5%', '5%']);

  return (
    <section
      ref={containerRef}
      id="story"
      className="relative z-10 scroll-mt-24 border-y border-white/10 bg-[#07080a] py-24 md:py-32"
    >
      {/* Background Grid Pattern */}
      <motion.div
        style={{ y: backgroundY }}
        className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(to_right,rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]"
      />

      <div className="section-container">
        {/* Section Header with Word-by-Word Scroll Scrub Reveal */}
        <SectionReveal>
          <div className="mx-auto max-w-4xl text-center">
            <div className="eyebrow mx-auto w-fit">
              <span className="live-dot" />
              // 02. What I Actually Do
            </div>
            <h2 className="mt-4 text-3xl font-extrabold uppercase tracking-tight text-white sm:text-5xl md:text-6xl">
              From Raw Tensors to{' '}
              <span className="text-[#3df5ff]">Production Reality</span>
            </h2>

            {/* Scroll-scrub Word Reveal */}
            <div className="mt-6 flex justify-center">
              <WordReveal
                text="You scrolled down to see what I actually do. Here is my core engineering loop: fine-tuning models, orchestrating multi-agent systems, writing low-latency APIs, and deploying full-stack products."
                className="max-w-2xl text-center text-base md:text-lg justify-center font-medium"
              />
            </div>
          </div>
        </SectionReveal>

        {/* Interactive Story Navigator Tabs */}
        <div className="mt-12 flex flex-wrap justify-center gap-2 md:gap-3">
          {storyChapters.map((chapter, idx) => {
            const isActive = activeTab === idx;
            return (
              <button
                key={chapter.id}
                onClick={() => setActiveTab(idx)}
                className={`flex items-center gap-2 border px-3 sm:px-4 py-1.5 sm:py-2 font-mono text-xs font-semibold transition-all duration-300 ${
                  isActive
                    ? 'border-[#3df5ff] bg-[#3df5ff]/10 text-white shadow-[0_0_20px_rgba(61,245,255,0.15)]'
                    : 'border-white/10 bg-[#07080a] text-white/50 hover:border-white/30 hover:text-white'
                }`}
              >
                <span
                  className="flex h-5 w-5 items-center justify-center font-bold text-[11px]"
                  style={{
                    backgroundColor: isActive ? chapter.color : 'rgba(255,255,255,0.08)',
                    color: isActive ? '#07080a' : '#888',
                  }}
                >
                  {chapter.id}
                </span>
                <span className="hidden sm:inline">{chapter.category}</span>
                <span className="sm:hidden text-[10px] text-white/80">{chapter.shortCategory}</span>
              </button>
            );
          })}
        </div>

        {/* Active Chapter Showcase Card */}
        <div className="mt-8">
          {storyChapters.map((chapter, idx) => {
            if (activeTab !== idx) return null;
            const Icon = chapter.icon;

            return (
              <motion.div
                key={chapter.id}
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className="grid gap-6 sm:gap-8 border border-white/10 bg-[#07080a]/90 p-4 sm:p-6 md:p-10 backdrop-blur-xl lg:grid-cols-[1.15fr_0.85fr] w-full min-w-0 max-w-full overflow-hidden"
              >
                {/* Left Column: Narrative Details & Bullet Points */}
                <div className="min-w-0 max-w-full overflow-hidden">
                  <div className="flex items-center gap-3">
                    <div
                      className="flex h-9 w-9 sm:h-10 sm:w-10 shrink-0 items-center justify-center border border-white/10"
                      style={{ backgroundColor: `${chapter.color}15`, color: chapter.color }}
                    >
                      <Icon size={18} />
                    </div>
                    <div className="min-w-0">
                      <span className="font-mono text-xs font-bold tracking-wider" style={{ color: chapter.color }}>
                        // CHAPTER {chapter.id}: {chapter.category}
                      </span>
                      <p className="font-mono text-[10px] sm:text-[11px] text-white/50 break-words leading-tight mt-0.5">
                        {chapter.telemetry}
                      </p>
                    </div>
                  </div>

                  <h3 className="mt-4 sm:mt-5 text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight break-words">
                    {chapter.title}
                  </h3>
                  <p className="mt-2 text-sm sm:text-base text-white/80 font-medium break-words">
                    {chapter.tagline}
                  </p>

                  {/* Bullet Highlights */}
                  <div className="mt-5 sm:mt-6 space-y-3">
                    {chapter.points.map((point, pIdx) => (
                      <div key={pIdx} className="flex items-start gap-2.5 sm:gap-3">
                        <CheckCircle2 size={16} className="mt-0.5 shrink-0" style={{ color: chapter.color }} />
                        <span className="text-xs sm:text-sm leading-relaxed text-[#8e929b] break-words">{point}</span>
                      </div>
                    ))}
                  </div>

                  {/* Real Project Link Reference */}
                  <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 border-t border-white/10 pt-5 sm:pt-6">
                    <div className="min-w-0">
                      <span className="font-mono text-[11px] sm:text-xs text-white/40">EVIDENCE IN PORTFOLIO:</span>
                      <p className="font-mono text-xs sm:text-sm font-semibold text-white truncate">{chapter.projectRef}</p>
                    </div>
                    <a
                      href="#projects"
                      className="inline-flex items-center gap-1.5 font-mono text-xs font-bold text-[#3df5ff] hover:underline shrink-0"
                    >
                      <span>JUMP TO PROJECT CARD</span>
                      <ArrowRight size={13} />
                    </a>
                  </div>
                </div>

                {/* Right Column: Code Terminal */}
                <div className="flex flex-col justify-between border border-white/10 bg-[#0d1017] p-3.5 sm:p-5 font-mono shadow-inner min-w-0 max-w-full overflow-hidden">
                  <div className="min-w-0 max-w-full">
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-2.5 sm:pb-3">
                      <div className="flex items-center gap-2 min-w-0">
                        <Terminal size={14} className="shrink-0" style={{ color: chapter.color }} />
                        <span className="text-xs text-white/80 font-bold truncate">
                          kernel_{chapter.category.toLowerCase().replace(/[^a-z]/g, '_')}.py
                        </span>
                      </div>
                      <span className="border border-white/10 bg-white/5 px-2 py-0.5 text-[9px] sm:text-[10px] text-white/50 shrink-0">
                        PYTHON 3.11 // PROD
                      </span>
                    </div>

                    <div className="mt-3 sm:mt-4 overflow-x-auto max-w-full rounded bg-black/40 p-2 sm:p-3 scrollbar-thin">
                      <pre className="text-[11px] sm:text-xs leading-relaxed text-white/85 whitespace-pre">
                        <code>{chapter.codeSnippet}</code>
                      </pre>
                    </div>
                  </div>

                  <div className="mt-4 sm:mt-6 border border-white/10 bg-[#07080a] p-2.5 sm:p-3 text-[10px] sm:text-[11px] text-white/50 break-words">
                    <span className="font-bold text-white">Engineering Principle:</span> Every architectural
                    pattern shown here is reflected in my public GitHub repositories and verified projects below.
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
