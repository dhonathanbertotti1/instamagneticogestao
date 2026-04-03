/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { 
  CheckCircle2, 
  PlayCircle, 
  TrendingUp, 
  Users, 
  Zap, 
  ShieldCheck, 
  ArrowRight, 
  Video, 
  Target, 
  Award,
  ChevronDown,
  Menu,
  X,
  Sparkles,
  Cpu,
  Globe,
  BarChart3,
  MousePointer2,
  Rocket,
  Search,
  LineChart,
  Calendar
} from 'lucide-react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'motion/react';
import { useState, useEffect, useRef } from 'react';

const GridBackground = () => (
  <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
    <div className="absolute inset-0 bg-grid bg-grid-fade opacity-20" />
    <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />
  </div>
);

const MouseGlow = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div 
      className="pointer-events-none fixed inset-0 z-30 transition-opacity duration-500"
      style={{
        background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(79, 70, 229, 0.08), transparent 80%)`
      }}
    />
  );
};

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'O Problema', href: '#problema' },
    { name: 'A Solução', href: '#metodo' },
    { name: 'Planos', href: '#oferta' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? 'bg-black/60 backdrop-blur-xl border-b border-white/5 py-4' : 'bg-transparent py-4 md:py-8'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-3 group cursor-pointer"
        >
          <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20 group-hover:rotate-12 transition-transform duration-300">
            <Rocket className="text-white w-6 h-6 fill-white" />
          </div>
          <span className="text-xl font-black tracking-tighter text-white">iNSTAMAGNÉTICO<span className="text-indigo-500">™</span></span>
        </motion.div>

        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link, i) => (
            <motion.a 
              key={link.name} 
              href={link.href} 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-white transition-colors relative group"
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-indigo-500 group-hover:w-full transition-all duration-300" />
            </motion.a>
          ))}
          <motion.a 
            href="#oferta" 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white text-black px-8 py-3 rounded-full text-xs font-black uppercase tracking-widest hover:bg-indigo-500 hover:text-white transition-all hover:shadow-[0_0_20px_rgba(79,70,229,0.4)]"
          >
            Solicitar Proposta
          </motion.a>
        </div>

        <button className="md:hidden text-white" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden absolute top-full left-0 w-full bg-black/95 backdrop-blur-2xl border-b border-white/5 overflow-hidden"
          >
            <div className="flex flex-col p-8 gap-6">
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href} 
                  className="text-lg font-bold text-gray-300"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </a>
              ))}
              <a 
                href="#oferta" 
                className="bg-indigo-600 text-white px-6 py-4 rounded-2xl text-center font-black uppercase tracking-widest"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Solicitar Proposta
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const MatrixBackground = ({ opacity = 0.5 }: { opacity?: number }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const fontSize = 16;
    const columns = Math.ceil(canvas.width / fontSize);
    const drops: number[] = [];
    for (let i = 0; i < columns; i++) {
      drops[i] = Math.random() * -100;
    }

    const chars = "01010101010101010101";

    const draw = () => {
      // Create the trail effect
      ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Matrix code color: White with glow
      ctx.fillStyle = "#fff";
      ctx.shadowBlur = 10;
      ctx.shadowColor = "#fff";
      ctx.font = `bold ${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
      
      // Reset shadow for next frame performance
      ctx.shadowBlur = 0;
    };

    const interval = setInterval(draw, 33);
    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ opacity, zIndex: 1 }}
      className="absolute inset-0 w-full h-full pointer-events-none"
    />
  );
};

const Hero = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section ref={containerRef} className="relative pt-32 md:pt-48 pb-20 md:pb-32 overflow-hidden min-h-screen flex items-center bg-black">
      <GridBackground />
      <MatrixBackground opacity={0.3} />

      <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          style={{ y, opacity }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-indigo-400 text-[10px] font-black uppercase tracking-[0.2em] mb-8">
            <Sparkles className="w-3 h-3" /> Gestão de Alta Performance
          </div>
          <h1 className="text-5xl md:text-8xl font-black text-white tracking-tighter leading-[0.9] mb-8">
            ESCALA SEU <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-indigo-400 bg-[length:200%_auto] animate-gradient">NEGÓCIO LOCAL</span> <br />
            COM TRÁFEGO PAGO.
          </h1>
          <p className="text-lg md:text-2xl text-gray-400 max-w-3xl mx-auto mb-12 leading-relaxed font-medium">
            Atraia clientes qualificados todos os dias com estratégias validadas por mais de 3 anos de experiência no mercado.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <a 
              href="#oferta" 
              className="group relative w-full sm:w-auto bg-white text-black px-10 py-5 rounded-2xl text-lg font-black uppercase tracking-widest transition-all hover:scale-105 active:scale-95 shadow-[0_0_40px_rgba(255,255,255,0.15)] flex items-center justify-center gap-3"
            >
              Ver Planos
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            <div className="flex items-center gap-3 text-gray-500 text-xs font-bold uppercase tracking-widest">
              <ShieldCheck className="w-5 h-5 text-indigo-500" /> 3+ Anos de Experiência
            </div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 100, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.4, duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="mt-16 md:mt-24 relative mx-auto max-w-5xl"
        >
          {/* Floating Elements - Left Side */}
          <div className="absolute -left-4 md:-left-20 top-1/4 z-20 space-y-4 scale-75 md:scale-100 hidden sm:block">
            {[
              { icon: <Target />, label: "CTR Médio", value: "4.2%", color: "indigo" },
              { icon: <Users />, label: "Seguidores Gerados", value: "1957+", color: "purple", sub: "Últimos 30 dias" }
            ].map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: -50 }}
                animate={{ 
                  opacity: 1, 
                  x: 0,
                  y: [0, -10, 0]
                }}
                transition={{ 
                  delay: 0.8 + i * 0.2,
                  y: {
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: i * 1
                  }
                }}
                className="glass-card px-6 py-4 rounded-2xl flex items-center gap-4 shadow-2xl shadow-indigo-500/10"
              >
                <div className={`w-10 h-10 rounded-xl bg-${item.color}-500/20 flex items-center justify-center text-${item.color}-400`}>
                  {item.icon}
                </div>
                <div className="text-left">
                  <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest">{item.label}</p>
                  <div className="flex flex-col">
                    <p className="text-lg text-white font-black">{item.value}</p>
                    {item.sub && <p className="text-[8px] text-indigo-400/60 font-bold uppercase tracking-tighter">{item.sub}</p>}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Floating Elements - Right Side */}
          <div className="absolute -right-4 md:-right-20 bottom-1/4 z-20 scale-75 md:scale-100 hidden sm:block">
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              animate={{ 
                opacity: 1, 
                x: 0,
                y: [0, 15, 0]
              }}
              transition={{ 
                delay: 1.2,
                y: {
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }
              }}
              className="glass-card p-6 rounded-3xl shadow-2xl shadow-purple-500/10"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
                <span className="text-[10px] text-gray-400 font-black uppercase tracking-widest">Campanhas Ativas</span>
              </div>
              <div className="flex items-end gap-2 h-20">
                {[40, 70, 45, 90, 65, 80, 50, 100].map((h, i) => (
                  <motion.div 
                    key={i}
                    initial={{ height: 0 }}
                    animate={{ height: `${h}%` }}
                    transition={{ delay: 1.4 + i * 0.1, duration: 0.5 }}
                    className="w-3 bg-indigo-500 rounded-t-sm"
                  />
                ))}
              </div>
            </motion.div>
          </div>

          <div className="glass-card rounded-[2rem] md:rounded-[2.5rem] p-1 md:p-2 overflow-hidden group">
            <div className="aspect-video rounded-[1.8rem] md:rounded-[2.25rem] overflow-hidden relative">
              <img 
                src="https://raw.githubusercontent.com/dhonathanbertotti1/imagens-dhonathan-bertotti/refs/heads/main/Dhonathan%20.png" 
                alt="Dhonathan Bertotti" 
                className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-1000"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const Problem = () => {
  return (
    <section id="problema" className="py-20 md:py-32 bg-black relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:grid-cols-2 lg:gap-24 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-indigo-500 font-black uppercase tracking-[0.3em] text-xs mb-6 block">O Desafio</span>
            <h2 className="text-4xl md:text-6xl font-black text-white mb-10 tracking-tighter leading-[0.95]">
              POR QUE SUA <br />
              <span className="text-zinc-700">AGENDA AINDA</span> <br />
              ESTÁ VAZIA?
            </h2>
            <p className="text-gray-400 text-xl mb-12 leading-relaxed">
              Muitos negócios locais falham porque dependem exclusivamente do boca a boca ou de postagens orgânicas que ninguém vê. Sem uma estratégia de tráfego, você está deixando dinheiro na mesa.
            </p>
            
            <div className="grid gap-6">
              {[
                "Dependência total do boca a boca.",
                "Postagens orgânicas com zero alcance.",
                "Falta de previsibilidade de novas vendas."
              ].map((pain, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center gap-5 p-6 rounded-3xl bg-white/[0.02] border border-white/[0.05] group hover:bg-white/[0.04] transition-colors"
                >
                  <div className="w-10 h-10 rounded-full bg-red-500/10 flex items-center justify-center text-red-500 group-hover:scale-110 transition-transform">
                    <X className="w-5 h-5" />
                  </div>
                  <span className="text-gray-300 font-bold text-lg">{pain}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative mt-12 lg:mt-0"
          >
            <div className="absolute inset-0 bg-indigo-600/20 blur-[100px] -z-10" />
            <div className="glass-card rounded-[2rem] md:rounded-[3rem] p-8 md:p-16 text-center relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
              <span className="text-indigo-400 font-black uppercase tracking-[0.4em] text-[10px] mb-8 block">Mercado 2025/26</span>
              <blockquote className="text-3xl md:text-5xl font-black text-white tracking-tighter leading-none mb-12">
                "QUEM NÃO INVESTE EM TRÁFEGO, NÃO É VISTO."
              </blockquote>
              <div className="flex items-center justify-center gap-4 mb-12">
                <div className="h-px w-12 bg-white/10" />
                <MousePointer2 className="text-indigo-500 w-6 h-6" />
                <div className="h-px w-12 bg-white/10" />
              </div>
              <h3 className="text-xl font-black text-white mb-6 uppercase tracking-widest">O SEGREDO É A PREVISIBILIDADE.</h3>
              <p className="text-gray-400 leading-relaxed font-medium">
                Nossa gestão foca em criar um fluxo constante de novos clientes qualificados, permitindo que você foque no que faz de melhor: atender seus clientes.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Features = () => {
  const features = [
    {
      icon: <Search />,
      title: "Estratégia Personalizada",
      desc: "Análise profunda do seu nicho e concorrentes para criar um plano de ação focado em conversão."
    },
    {
      icon: <Video />,
      title: "Estratégia Semi Dark",
      desc: "Crescimento orgânico acelerado com conteúdos onde você não precisa aparecer, focando 100% na atração de público qualificado."
    },
    {
      icon: <Zap />,
      title: "Gestão Diária",
      desc: "Otimização constante das campanhas para garantir o menor custo por lead possível."
    },
    {
      icon: <LineChart />,
      title: "Relatórios Mensais",
      desc: "Transparência total com dados reais sobre investimento, alcance e retorno financeiro."
    }
  ];

  return (
    <section id="metodo" className="py-20 md:py-32 bg-zinc-950 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16 md:mb-24">
          <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-indigo-500 font-black uppercase tracking-[0.4em] text-xs mb-6 block"
          >
            Metodologia iNSTAMAGNÉTICO
          </motion.span>
          <h2 className="text-4xl md:text-7xl font-black text-white tracking-tighter">O QUE ENTREGAMOS</h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {features.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              whileHover={{ y: -10 }}
              className="glass-card p-8 md:p-10 rounded-[2rem] md:rounded-[2.5rem] group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-600/5 blur-3xl -z-10 group-hover:bg-indigo-600/10 transition-colors" />
              <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center text-indigo-500 mb-8 group-hover:scale-110 group-hover:bg-indigo-500 group-hover:text-white transition-all duration-500">
                {f.icon}
              </div>
              <h4 className="text-2xl font-black text-white mb-4 tracking-tight uppercase">{f.title}</h4>
              <p className="text-gray-400 leading-relaxed font-medium">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const BentoResults = () => {
  return (
    <section className="py-20 md:py-32 bg-black relative overflow-hidden">
      <MatrixBackground opacity={0.15} />
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16 md:mb-24">
          <h2 className="text-4xl md:text-7xl font-black text-white tracking-tighter mb-6">RESULTADOS REAIS</h2>
          <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto">O impacto direto na escala do seu negócio.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="md:col-span-2 glass-card rounded-[2rem] md:rounded-[3rem] p-8 md:p-12 flex flex-col justify-between"
          >
            <div>
              <span className="text-indigo-500 font-black uppercase tracking-widest text-[10px] mb-4 block">Performance Metric</span>
              <h3 className="text-4xl md:text-6xl font-black text-white tracking-tighter mb-6">ROI MÉDIO</h3>
            </div>
            <div className="flex items-end justify-between">
              <p className="text-5xl md:text-8xl font-black text-white tracking-tighter">12.5x</p>
              <div className="w-16 h-16 md:w-24 md:h-24 bg-indigo-500/10 rounded-full flex items-center justify-center">
                <TrendingUp className="text-indigo-500 w-8 h-8 md:w-10 md:h-10" />
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="glass-card rounded-[2rem] md:rounded-[3rem] p-8 md:p-12 flex flex-col justify-between bg-indigo-600"
          >
            <h3 className="text-xl md:text-2xl font-black text-white uppercase tracking-widest mb-8">Leads Qualificados</h3>
            <p className="text-5xl md:text-6xl font-black text-white tracking-tighter">+850</p>
            <div className="mt-8 flex -space-x-4">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="w-10 h-10 md:w-12 md:h-12 rounded-full border-4 border-indigo-600 bg-zinc-800 overflow-hidden">
                  <img src={`https://i.pravatar.cc/150?u=${i+10}`} alt="User" referrerPolicy="no-referrer" />
                </div>
              ))}
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-full border-4 border-indigo-600 bg-white text-black flex items-center justify-center text-[10px] font-black">
                +100
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="glass-card rounded-[2rem] md:rounded-[3rem] p-8 md:p-12"
          >
            <h3 className="text-xl md:text-2xl font-black text-white uppercase tracking-widest mb-4">EXPERIÊNCIA</h3>
            <p className="text-5xl md:text-7xl font-black text-indigo-500 tracking-tighter">3+ ANOS</p>
            <p className="text-gray-500 mt-4 text-sm font-bold">Estratégias validadas em diversos nichos locais.</p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className="md:col-span-2 glass-card rounded-[2rem] md:rounded-[3rem] p-8 md:p-12 flex items-center gap-6 md:gap-12"
          >
            <div className="hidden sm:block w-24 h-24 md:w-32 md:h-32 bg-white/5 rounded-2xl md:rounded-3xl flex items-center justify-center">
              <BarChart3 className="text-white w-12 h-12 md:w-16 md:h-16" />
            </div>
            <div>
              <h3 className="text-2xl md:text-3xl font-black text-white tracking-tighter mb-4 uppercase">CRESCIMENTO ESCALÁVEL</h3>
              <p className="text-gray-400 text-base md:text-lg leading-relaxed">
                Não apenas cliques, mas clientes reais que entram em contato prontos para fechar negócio.
              </p>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
            className="md:col-span-3 glass-card rounded-[2rem] md:rounded-[3rem] p-8 md:p-12 overflow-hidden"
          >
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
              <div>
                <h3 className="text-3xl md:text-5xl font-black text-white tracking-tighter uppercase">RESULTADOS ORGÂNICOS</h3>
                <p className="text-gray-500 font-bold mt-2">Escala massiva sem investimento em anúncios.</p>
              </div>
              <div className="px-6 py-2 bg-indigo-500/10 rounded-full border border-indigo-500/20 text-indigo-400 text-xs font-black uppercase tracking-widest">
                Estratégia Semi Dark
              </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div className="rounded-3xl overflow-hidden border border-white/5 group relative aspect-[4/3] lg:aspect-auto">
                <img 
                  src="https://raw.githubusercontent.com/dhonathanbertotti1/imagens-dhonathan-bertotti/refs/heads/main/Design%20sem%20nome%20(1).png" 
                  alt="Resultado Orgânico" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              </div>
              
              <div className="space-y-8">
                <div className="p-8 bg-white/[0.02] rounded-[2rem] border border-white/[0.05] relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/5 blur-2xl -z-10" />
                  <p className="text-gray-300 text-lg leading-relaxed italic mb-8">
                    "A estratégia semi dark permitiu um alcance de milhões de visualizações sem gastar um único real em tráfego pago, atraindo uma audiência extremamente qualificada e engajada para o funil de vendas."
                  </p>
                  <div className="flex flex-wrap gap-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
                        <TrendingUp className="text-white w-6 h-6" />
                      </div>
                      <div>
                        <p className="text-white font-black uppercase tracking-widest text-[10px]">Alcance Viral</p>
                        <p className="text-indigo-400 font-black text-xl">+1.2M Views</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-purple-600 flex items-center justify-center shadow-lg shadow-purple-500/20">
                        <Users className="text-white w-6 h-6" />
                      </div>
                      <div>
                        <p className="text-white font-black uppercase tracking-widest text-[10px]">Conversão Orgânica</p>
                        <p className="text-purple-400 font-black text-xl">+15% CTR</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 p-6 rounded-2xl bg-indigo-500/5 border border-indigo-500/10">
                  <Sparkles className="text-indigo-400 w-6 h-6" />
                  <p className="text-gray-400 text-sm font-medium">
                    Estratégia focada em retenção e algoritmo, garantindo que seu conteúdo trabalhe para você 24/7.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Pricing = () => {
  const plans = [
    {
      name: "Plano Essencial",
      price: "800",
      desc: "Ideal para quem está começando e quer validar o canal de vendas.",
      features: ["Gestão de 1 Canal (Meta ou Google)", "Relatório Mensal", "Suporte via Email", "Configuração de Pixel/API"],
      highlight: false
    },
    {
      name: "Plano Crescimento",
      price: "1.400",
      desc: "O equilíbrio perfeito entre investimento e escala acelerada.",
      features: ["Gestão de 2 Canais (Meta + Google)", "Relatórios Quinzenais", "Suporte via WhatsApp", "Análise de Criativos", "Otimização de Funil", "Estratégia Semi Dark"],
      highlight: true
    },
    {
      name: "Plano iNSTAMAGNÉTICO",
      price: "2.500",
      desc: "Dominação total de mercado com estratégias multicanal avançadas.",
      features: ["Gestão Multicanal", "Relatórios Semanais", "Suporte VIP 24/7", "Consultoria de Vendas", "Estratégia Semi Dark", "Criação de Landing Page", "CRO (Otimização de LP)"],
      highlight: false
    }
  ];

  return (
    <section id="oferta" className="py-20 md:py-32 bg-zinc-950 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-grid bg-grid-fade opacity-10" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16 md:mb-20">
          <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-indigo-500 font-black uppercase tracking-[0.4em] text-xs mb-6 block"
          >
            Investimento & Escala
          </motion.span>
          <h2 className="text-4xl md:text-7xl font-black text-white tracking-tighter">PLANOS DE GESTÃO</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6 md:gap-8 items-start">
          {plans.map((plan, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`glass-card rounded-[2rem] md:rounded-[3rem] p-6 md:p-12 relative overflow-hidden flex flex-col h-full ${plan.highlight ? 'border-indigo-500/50 shadow-[0_0_40px_rgba(79,70,229,0.2)]' : ''}`}
            >
              {plan.highlight && (
                <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-500" />
              )}
              
              <div className="mb-10">
                <span className={`font-black uppercase tracking-widest text-[10px] mb-4 block ${plan.highlight ? 'text-indigo-400' : 'text-gray-500'}`}>
                  {plan.highlight ? 'Mais Popular' : 'Gestão iNSTAMAGNÉTICO'}
                </span>
                <h3 className="text-2xl md:text-3xl font-black text-white tracking-tighter mb-4 uppercase">{plan.name}</h3>
                <p className="text-gray-400 text-sm font-medium leading-relaxed">{plan.desc}</p>
              </div>

              <div className="mb-10">
                <div className="flex items-baseline gap-2">
                  <span className="text-xl font-black text-white">R$</span>
                  <span className="text-5xl md:text-6xl font-black text-white tracking-tighter">{plan.price}</span>
                  <span className="text-gray-500 font-black uppercase tracking-widest text-[10px]">/ mês</span>
                </div>
                <p className="text-indigo-400/60 mt-2 text-[10px] font-black uppercase tracking-widest">Contrato mín. 3 meses</p>
              </div>

              <div className="space-y-4 mb-4 flex-grow">
                {plan.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <CheckCircle2 className="w-4 h-4 text-indigo-500 flex-shrink-0" />
                    <span className="text-gray-300 text-sm font-medium">{feature}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-20 flex flex-col md:flex-row items-center gap-12 text-left glass-card p-10 md:p-12 rounded-[3rem]">
          <div className="w-24 h-24 md:w-32 md:h-32 bg-indigo-600 rounded-[2rem] flex items-center justify-center flex-shrink-0 shadow-2xl shadow-indigo-500/20">
            <ShieldCheck className="text-white w-12 h-12 md:w-16 md:h-16" />
          </div>
          <div>
            <h3 className="text-xl md:text-2xl font-black text-white mb-4 uppercase tracking-widest">ENTRADA GRADUAL E SEGURA</h3>
            <p className="text-gray-400 text-base md:text-lg leading-relaxed font-medium">
              Recomendamos uma verba inicial de R$ 800/mês em anúncios para testar e validar o público antes de escalar. Oferecemos 7 dias de garantia sobre nossa metodologia de gestão.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="py-20 bg-black border-t border-white/5 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center gap-12 mb-20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center">
              <Rocket className="text-white w-6 h-6 fill-white" />
            </div>
            <span className="text-xl font-black tracking-tighter text-white">iNSTAMAGNÉTICO™</span>
          </div>
          
          <div className="flex gap-12">
            {['Termos', 'Privacidade', 'Suporte'].map(link => (
              <a key={link} href="#" className="text-gray-500 hover:text-white text-xs font-black uppercase tracking-widest transition-colors">
                {link}
              </a>
            ))}
          </div>
        </div>
        
        <div className="text-center text-gray-700 text-[10px] font-black uppercase tracking-[0.5em]">
          <p>Copyright 2026 © Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default function App() {
  return (
    <div className="min-h-screen bg-black font-sans selection:bg-indigo-500/30 selection:text-white">
      <MouseGlow />
      <Navbar />
      <main>
        <Hero />
        <Problem />
        <Features />
        <BentoResults />
        <Pricing />
      </main>
      <Footer />
      
      {/* Scroll Progress Bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-indigo-500 origin-left z-[60]"
        style={{ scaleX: useSpring(useScroll().scrollYProgress, { stiffness: 100, damping: 30 }) }}
      />
    </div>
  );
}
