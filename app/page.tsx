"use client"

import { useEffect, useState } from "react"
import { Github, Linkedin, Mail, ExternalLink, Moon, Sun } from "lucide-react"

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState("about")
  const [theme, setTheme] = useState<"light" | "dark">("light")
  const [expandedRecommendations, setExpandedRecommendations] = useState<Set<number>>(new Set())
  const [showNavbar, setShowNavbar] = useState(false)

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null
    const systemTheme = window.matchMedia("(prefers-color-scheme: light)").matches ? "dark" : "light"
    const initialTheme = savedTheme || systemTheme
    setTheme(initialTheme)
    document.documentElement.classList.toggle("dark", initialTheme === "dark")
  }, [])

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light"
    setTheme(newTheme)
    localStorage.setItem("theme", newTheme)
    document.documentElement.classList.toggle("dark", newTheme === "dark")
  }

  const toggleRecommendation = (index: number) => {
    setExpandedRecommendations((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(index)) {
        newSet.delete(index)
      } else {
        newSet.add(index)
      }
      return newSet
    })
  }

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["about", "recommendations", "experience", "projects"]
      const scrollPosition = window.scrollY + window.innerHeight / 3

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const handleNavbarVisibility = () => {
      // Only show navbar on mobile
      const isMobile = window.innerWidth < 1024
      if (!isMobile) {
        setShowNavbar(false)
        return
      }

      // Find the social icons container
      const socialIcons = document.getElementById("social-icons")
      if (!socialIcons) return

      const socialIconsRect = socialIcons.getBoundingClientRect()
      // Show navbar when social icons are scrolled past (bottom is above viewport top)
      setShowNavbar(socialIconsRect.bottom < 0)
    }

    window.addEventListener("scroll", handleNavbarVisibility)
    window.addEventListener("resize", handleNavbarVisibility)
    handleNavbarVisibility() // Check on mount

    return () => {
      window.removeEventListener("scroll", handleNavbarVisibility)
      window.removeEventListener("resize", handleNavbarVisibility)
    }
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  const recommendations = [
    {
      text: `Svastik was a tremendous contributor to the team. He takes ownership and pride in is work to deliver high quality results. 
      This started with good technical understanding of the problem, even as a junior member of the team he took on several difficult projects requiring architecting the system first and documenting it for review. This then extended to the implementation, delivering clean, robust, tested code. 
      And finally delivery and shipping, which often included him testing end to end to ensure quality.
      In a very short period of tenure there are critical features, without which, theScore Bet platform would not be what it is today, without Svastik.`,
      author: "Igor Svistoun",
      title: "Engineering Manager, Accounts Core @ PENN Entertainment Inc.",
      linkedinUrl: "https://www.linkedin.com/in/svastiksharma/details/recommendations/",
    },
    {
      text: `Svastik was a great addition to our team, he is a fast learner, very committed software engineer and has immense potential to grow. It didn't take long after joining the team to start making great contributions on our code base, following our standards and being creative. I also want to 
      highlight his work optimizing code, he really give his best to find gaps in performance 
      and suggest solutions. I must also mention he has a great communication verbally and written and always keep up bringing updates about his work. Last but not least he is always absorbing the feedback gave to him and growing from that, definitely the type of professional I want on my team.
      It was great working with you!`,
      author: "Ataíde Neto",
      title: `Tech Lead Manager, Accounts Core @ PENN Entertainment Inc.`,
      linkedinUrl: "https://www.linkedin.com/in/svastiksharma/details/recommendations/",
    },
    {
      text: "Curious, great communicator, and solid technical skills. The energy and personality he brought to our team was essential in forming our identity. I look forward to working with him again in the future!",
      author: "Ryan Nesbitt",
      title: "Engineering Manager, SRE @ theScore",
      linkedinUrl: "https://www.linkedin.com/in/svastiksharma/details/recommendations/",
    },
    {
      text: `Svastik is a hard-working software engineer who finds creative solutions to complex problems. 
      Even though he’s a co-op student, he contributes at a full-time level. 
      When faced with hurdles, he’s always taking initiatives to talk to stakeholders and find out what he’s looking for. 
      Under minimal guidance, he has completed many high-impact tickets and worked on many important projects. 
      He is also a pleasant person to work with. He’s open to new ideas and collaborates well with people from different backgrounds.`,
      author: "Ziqi Zhou",
      title: "Site reliability engineer @ theScore",
      linkedinUrl: "https://www.linkedin.com/in/svastiksharma/details/recommendations/",
    },
    {
      text: `I am delighted to recommend Svastik for any development role. As Svastik's manager, I had the opportunity to work closely with 
      him and was always impressed with his attention to detail and eagerness to learn.
      Svastik is an exceptional developer who possesses a keen eye for detail. 
      He is a quick learner and was able to contribute right away to the projects he was assigned to. 
      His ability to pick up problems, think about them, do research, and then solve them, makes him a strong developer who can produce results very quickly.
      What sets Svastik apart is his unwavering desire to learn and improve. He was always inquisitive about how things worked, even outside of the work he was responsible for. This thirst for knowledge, combined with his strong technical skills, allowed him to consistently deliver high-quality work.
      Svastik is an excellent team player who was always willing to help his colleagues. He has a positive attitude and was a pleasure to work with. His ability to communicate technical concepts in a clear and concise manner made him a valuable asset to our team.
      Overall, I highly recommend Svastik for any development role. He is an exceptional developer who is eager to learn and has a great attitude. His technical skills, coupled with his ability to work collaboratively, make him an invaluable asset to any organization.`,
      author: "Terence Tan",
      title: "Full Stack Developer @ 4Pay Inc.",
      linkedinUrl: "https://www.linkedin.com/in/svastiksharma/details/recommendations/",
    }
  ]

  return (
    <div className="min-h-screen lg:flex">
      {/* Sticky Navbar - Shows when scrolled past social icons on mobile only */}
      {showNavbar && (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border shadow-sm lg:hidden">
          <div className="px-4 py-2 flex items-center justify-between max-w-7xl mx-auto">
            <div className="flex items-center gap-2 sm:gap-3">
              <h1 className="text-base sm:text-lg font-bold text-foreground">Svastik Sharma</h1>
              <span className="text-muted-foreground hidden sm:inline">|</span>
              <h2 className="text-xs sm:text-sm font-medium text-muted-foreground">Software Engineer</h2>
            </div>
            <div className="flex items-center gap-2 sm:gap-4">
              {[
                { id: "about", label: "ABOUT", number: "01" },
                { id: "recommendations", label: "RECOMMENDATIONS", number: "02" },
                { id: "experience", label: "EXPERIENCE", number: "03" },
                { id: "projects", label: "PROJECTS", number: "04" },
              ].map((section) => (
                <button
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  className={`text-xs font-medium uppercase tracking-widest transition-colors ${
                    activeSection === section.id ? "text-primary" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {section.number}
                </button>
              ))}
            </div>
          </div>
        </nav>
      )}

      {/* Left Sidebar */}
      <aside className="lg:sticky lg:top-0 lg:h-screen lg:w-[40%] lg:flex lg:flex-col lg:justify-start p-8 lg:px-16 lg:py-24">
        <div className="max-w-md mx-auto w-full">
          <div className="flex items-center gap-4 mb-3">
            <div className="relative flex-shrink-0 group">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 blur-sm group-hover:blur-md transition-all duration-300"></div>
              <img
                src="/about-image.jpeg"
                alt="Svastik Sharma"
                className="relative w-24 h-24 lg:w-32 lg:h-32 rounded-full object-cover border-2 border-border/50 shadow-lg ring-2 ring-primary/10 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:ring-primary/20"
              />
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground">Svastik Sharma</h1>
              <h2 className="text-base sm:text-lg lg:text-xl font-medium text-foreground mt-1">Software Engineer</h2>
            </div>
          </div>
          <p className="text-muted-foreground max-w-xs mb-8 lg:mb-16">
          </p>

          {/* Navigation */}
          <nav className="block mb-8 lg:mb-16">
            <ul className="space-y-4">
              {[
                { id: "about", label: "ABOUT", number: "01" },
                { id: "recommendations", label: "RECOMMENDATIONS", number: "02" },
                { id: "experience", label: "EXPERIENCE", number: "03" },
                { id: "projects", label: "PROJECTS", number: "04" },
              ].map((section) => (
                <li key={section.id}>
                  <button
                    onClick={() => scrollToSection(section.id)}
                    className="group flex items-center gap-4 text-sm font-medium uppercase tracking-widest transition-all hover:text-foreground"
                  >
                    <span
                      className={`text-xs font-mono transition-all ${
                        activeSection === section.id ? "text-primary scale-110" : "text-muted-foreground"
                      }`}
                    >
                      {section.number}
                    </span>
                    <span
                      className={`transition-all ${
                        activeSection === section.id ? "text-foreground translate-x-2" : "text-muted-foreground"
                      }`}
                    >
                      {section.label}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          {/* Social Links and Theme Toggle */}
          <div id="social-icons" className="flex gap-5 items-center">
            <a
              href="https://github.com/svastiks"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <Github className="w-6 h-6" />
            </a>
            <a
              href="https://www.linkedin.com/in/svastiksharma/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <Linkedin className="w-6 h-6" />
            </a>
            <a href="mailto:svastiksharma13@gmail.com" className="text-muted-foreground hover:text-foreground transition-colors">
              <Mail className="w-6 h-6" />
            </a>
            <button
              onClick={toggleTheme}
              className="ml-auto text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Toggle theme"
            >
              {theme === "light" ? <Moon className="w-6 h-6" /> : <Sun className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </aside>

      {/* Right Content - Scrollable */}
      <main className="lg:w-[60%] p-8 lg:pr-16 lg:py-24">
        {/* About Section */}
        <section id="about" className="mb-24 scroll-mt-24">
          <div className="lg:hidden mb-3">
            <h3 className="text-lg sm:text-xl font-bold uppercase tracking-widest text-foreground mb-2 pb-2 border-b-2 border-primary inline-block">About</h3>
          </div>
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              Hey, my name is Svastik Sharma and I'm a software engineer based in Toronto, Canada 🇨🇦.
              I went to York University in Toronto where I studied Software Engineering (Big Data Stream).
              
              <br />
              <br />

              I'm passionate about building secure, scalable and well-tested software, with careful consideration for the infrastructure that supports it and the platform it's deployed on.
              <br />
              <br />
              I enjoy turning complex technical problems into clear, structured problems that can be solved methodically.
              I take pride in documenting insights, identifying edge cases and implementing robust, well-tested solutions that can be presented as real-world features.

              <br />
              <br />
              Outside of engineering, I try to:
              <br />
              - Stay fit 🏋️‍♂️ 
              <br />
              - Read books 📚
              <br />
              - Travel ✈️

              <br />
              <br />



            </p>
            <p>

            </p>
            <p>

            </p>
          </div>
        </section>

        {/* Recommendations Section */}
        <section id="recommendations" className="mb-24 scroll-mt-24">
          <div className="lg:hidden mb-3">
            <h3 className="text-lg sm:text-xl font-bold uppercase tracking-widest text-foreground mb-2 pb-2 border-b-2 border-primary inline-block">Recommendations</h3>
          </div>
          <div className="space-y-8">
            {recommendations.map((rec, index) => {
              const isExpanded = expandedRecommendations.has(index)
              return (
                <div
                  key={index}
                  className="group relative border-l-2 border-primary pl-6 hover:border-primary/80 transition-colors"
                >
                  <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-primary flex items-center justify-center">
                    <Linkedin className="w-2.5 h-2.5 text-primary-foreground" />
                  </div>
                  <p className={`text-muted-foreground italic mb-1 ${isExpanded ? "" : "line-clamp-3"}`}>
                    "{rec.text}"
                  </p>
                  <button
                    onClick={() => toggleRecommendation(index)}
                    className="text-primary hover:text-primary/80 text-xs mb-3 transition-colors"
                  >
                    {isExpanded ? "Read less" : "Read more"}
                  </button>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-foreground font-medium">{rec.author}</p>
                      <p className="text-sm text-muted-foreground">{rec.title}</p>
                    </div>
                    {rec.linkedinUrl && (
                      <a
                        href={rec.linkedinUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:text-primary/80 transition-colors text-xs flex items-center gap-1"
                      >
                        View on LinkedIn
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </section>

        {/* Experience Section */}
        <section id="experience" className="mb-24 scroll-mt-24">
          <div className="lg:hidden mb-3">
            <h3 className="text-lg sm:text-xl font-bold uppercase tracking-widest text-foreground mb-2 pb-2 border-b-2 border-primary inline-block">Experience</h3>
          </div>
          <div className="space-y-12">
            <div className="group">
              <div className="grid lg:grid-cols-[25%_75%] gap-2 lg:gap-8">
                <div className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mt-1">
                  SEP 2025 — NOV 2025
                </div>
                <div>
                  <div className="flex items-start gap-3 mb-2">
                    <img src="/company_logo_1.png" alt="PENN Entertainment" className="w-12 h-12 object-contain flex-shrink-0 mt-1" />
                    <div className="flex-1">
                      <h4 className="text-foreground font-medium group-hover:text-primary transition-colors">
                        <a
                          href="https://www.pennentertainment.com/corp/our-brands/thescore"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:underline"
                        >
                          Software Engineer, Full Time (Accounts Core)
                          <ExternalLink className="inline-block ml-2 w-4 h-4 -translate-y-[2px] group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                        </a>
                        <br />
                        <span className="text-muted-foreground font-normal">
                          PENN Entertainment · Toronto, ON
                        </span>
                      </h4>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                    Led US <strong>iGaming compliance project</strong> from concept to launch. Improved app <strong>p95</strong> <strong>login time</strong> for <strong>5M users</strong> through database optimization. Enhanced security, monitoring, and reduced cloud costs via autoscaling tuning.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary">Elixir</span>
                    <span className="px-3 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary">Phoenix</span>
                    <span className="px-3 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary">PostgreSQL</span>
                    <span className="px-3 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary">Ecto</span>
                    <span className="px-3 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary">React</span>
                    <span className="px-3 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary">TypeScript</span>
                    <span className="px-3 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary">Tailwind CSS</span>
                    <span className="px-3 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary">Kubernetes</span>
                    <span className="px-3 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary">Docker</span>
                    <span className="px-3 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary">ArgoCD</span>
                    <span className="px-3 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary">Datadog</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="group">
              <div className="grid lg:grid-cols-[25%_75%] gap-2 lg:gap-8">
                <div className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mt-1">
                  MAY 2025 — AUG 2025
                </div>
                <div>
                  <div className="flex items-start gap-3 mb-2">
                    <img src="/company_logo_1.png" alt="PENN Entertainment" className="w-12 h-12 object-contain flex-shrink-0 mt-1" />
                    <div className="flex-1">
                      <h4 className="text-foreground font-medium group-hover:text-primary transition-colors">
                        <a
                          href="https://www.pennentertainment.com/corp/our-brands/thescore"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:underline"
                        >
                          Software Engineer, Coop (Accounts Core)
                          <ExternalLink className="inline-block ml-2 w-4 h-4 -translate-y-[2px] group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                        </a>
                        <br />
                        <span className="text-muted-foreground font-normal">
                          PENN Entertainment · Toronto, ON
                        </span>
                      </h4>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                    Improved user retention by implementing auto-generated usernames and refining sign-up flows. Led <strong>PgBouncer</strong> migration with <strong>performance testing</strong> via <strong>K6</strong>, optimizing the <strong>Elixir</strong> codebase to improve database connection efficiency and reduce latency.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary">Elixir</span>
                    <span className="px-3 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary">PostgreSQL</span>
                    <span className="px-3 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary">React</span>
                    <span className="px-3 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary">PgBouncer</span>
                    <span className="px-3 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary">K6</span>
                    <span className="px-3 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary">Datadog</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="group">
              <div className="grid lg:grid-cols-[25%_75%] gap-2 lg:gap-8">
                <div className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mt-1">
                  SEP 2024 — DEC 2024
                </div>
                <div>
                  <div className="flex items-start gap-3 mb-2">
                    <img src="/company_logo_2.png" alt="theScore Bet" className="w-12 h-12 object-contain flex-shrink-0 mt-1" />
                    <div className="flex-1">
                      <h4 className="text-foreground font-medium group-hover:text-primary transition-colors">
                        <a
                          href="https://about.thescore.bet/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:underline"
                        >
                          Software Engineer, Coop (Sports Core)
                          <ExternalLink className="inline-block ml-2 w-4 h-4 -translate-y-[2px] group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                        </a>
                        <br />
                        <span className="text-muted-foreground font-normal">
                          theScore Bet · Toronto, ON
                        </span>
                      </h4>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                    Designed and implemented a <strong>Golf</strong> data <strong>ingestion pipeline</strong> for <strong>3 million</strong> users using <strong>Elixir</strong>, <strong>MySQL</strong>, <strong>Oban</strong>, and <strong>PostgreSQL</strong>. Improved monitoring with <strong>Datadog</strong> and eliminated external dependencies by engineering Postgres mapping tables.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary">Elixir</span>
                    <span className="px-3 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary">MySQL</span>
                    <span className="px-3 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary">Oban</span>
                    <span className="px-3 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary">PostgreSQL</span>
                    <span className="px-3 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary">Datadog</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="group">
              <div className="grid lg:grid-cols-[25%_75%] gap-2 lg:gap-8">
                <div className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mt-1">
                  MAY 2024 — AUG 2024
                </div>
                <div>
                  <div className="flex items-start gap-3 mb-2">
                    <img src="/company_logo_2.png" alt="theScore Bet" className="w-12 h-12 object-contain flex-shrink-0 mt-1" />
                    <div className="flex-1">
                      <h4 className="text-foreground font-medium group-hover:text-primary transition-colors">
                        <a
                          href="https://about.thescore.bet/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:underline"
                        >
                          Site Reliability Engineer (SRE), Coop
                          <ExternalLink className="inline-block ml-2 w-4 h-4 -translate-y-[2px] group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                        </a>
                        <br />
                        <span className="text-muted-foreground font-normal">
                          theScore Bet · Toronto, ON
                        </span>
                      </h4>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                    Automated end-to-end release pipeline using <strong>GitHub Actions</strong> and <strong>ArgoCD</strong>. Developed a <strong>Slack bot</strong> with <strong>Python (Flask)</strong> and Jira REST API to automate release creation. Implemented PR validation and Feature Flag change detection to reduce manual QA.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary">GitHub Actions</span>
                    <span className="px-3 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary">ArgoCD</span>
                    <span className="px-3 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary">Python</span>
                    <span className="px-3 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary">Flask</span>
                    <span className="px-3 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary">Jira API</span>
                    <span className="px-3 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary">Slack API</span>
                    <span className="px-3 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary">CRON</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="group">
              <div className="grid lg:grid-cols-[25%_75%] gap-2 lg:gap-8">
                <div className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mt-1">
                  MAY 2023 — AUG 2023
                </div>
                <div>
                  <div className="flex items-start gap-3 mb-2">
                    <img src="/company_logo_3.png" alt="4Pay Inc." className="w-12 h-12 object-contain flex-shrink-0 mt-1" />
                    <div className="flex-1">
                      <h4 className="text-foreground font-medium group-hover:text-primary transition-colors">
                        <a
                          href="https://www.4pay.ca/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:underline"
                        >
                          Software Developer, Coop
                          <ExternalLink className="inline-block ml-2 w-4 h-4 -translate-y-[2px] group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                        </a>
                        <br />
                        <span className="text-muted-foreground font-normal">
                          4Pay Inc. · Toronto, ON
                        </span>
                      </h4>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                    Developed workflows using <strong>JavaScript</strong>, <strong>jQuery</strong>, and <strong>CakePHP</strong> handling <strong>5+ API endpoints</strong>. Led team of <strong>3</strong> interns and supported <strong>DB migration</strong> by writing <strong>SQL</strong> scripts, resolving production issues post-migration.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary">JavaScript</span>
                    <span className="px-3 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary">jQuery</span>
                    <span className="px-3 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary">CakePHP</span>
                    <span className="px-3 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary">SQL</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="group">
              <div className="grid lg:grid-cols-[25%_75%] gap-2 lg:gap-8">
                <div className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mt-1">
                  JAN 2023 — APR 2023
                </div>
                <div>
                  <div className="flex items-start gap-3 mb-2">
                    <img src="/company_logo_3.png" alt="4Pay Inc." className="w-12 h-12 object-contain flex-shrink-0 mt-1" />
                    <div className="flex-1">
                      <h4 className="text-foreground font-medium group-hover:text-primary transition-colors">
                        <a
                          href="https://www.4pay.ca/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:underline"
                        >
                          Software Developer, Coop
                          <ExternalLink className="inline-block ml-2 w-4 h-4 -translate-y-[2px] group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                        </a>
                        <br />
                        <span className="text-muted-foreground font-normal">
                          4Pay Inc. · Toronto, ON
                        </span>
                      </h4>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                    Revamped existing project with new <strong>UI</strong> using <strong>JavaScript (jQuery)</strong>, <strong>Bootstrap</strong>, and <strong>CakePHP</strong>. Integrated <strong>RESTful APIs</strong> (XML to JSON) and reduced page loading times by <strong>30%</strong>, improving user satisfaction.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary">JavaScript</span>
                    <span className="px-3 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary">jQuery</span>
                    <span className="px-3 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary">Bootstrap</span>
                    <span className="px-3 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary">CakePHP</span>
                    <span className="px-3 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary">RESTful APIs</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* <div className="mt-12">
            <a
              href="/resume.pdf"
              target="_blank"
              className="inline-flex items-center text-sm font-medium text-foreground hover:text-primary transition-colors group"
              rel="noreferrer"
            >
              View Full Resume
              <ExternalLink className="ml-2 w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </a>
          </div> */}
        </section>

        {/* Projects Section */}
        <section id="projects" className="mb-24 scroll-mt-24">
          <div className="lg:hidden mb-3">
            <h3 className="text-lg sm:text-xl font-bold uppercase tracking-widest text-foreground mb-2 pb-2 border-b-2 border-primary inline-block">Projects</h3>
          </div>
          <div className="space-y-12">
            <div className="group block">
              <div className="grid lg:grid-cols-[30%_70%] gap-4 lg:gap-8">
                <a
                  href="https://macpcos.netlify.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="order-2 lg:order-1 rounded border border-border group-hover:border-primary/50 transition-colors overflow-hidden aspect-video block"
                >
                  <img
                    src="/mcmaster-pcos.png"
                    alt="McMaster Club Website"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </a>
                <div className="order-1 lg:order-2">
                  <h4 className="text-foreground font-medium mb-2 group-hover:text-primary transition-colors">
                    <a
                      href="https://macpcos.netlify.app/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline"
                    >
                      McMaster Club Website
                      <ExternalLink className="inline-block ml-2 w-4 h-4 -translate-y-[2px] group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </a>
                    {" "}
                    <span className="text-muted-foreground font-normal text-sm">|</span>{" "}
                    <a
                      href="https://github.com/svastiks/mcmaster-pcos-club"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-primary transition-colors text-sm"
                    >
                      Github
                      <ExternalLink className="inline-block ml-1 w-3 h-3 -translate-y-[2px]" />
                    </a>
                  </h4>
                  <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                    Building a club website for my sister's McMaster PCOS student club.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary">TypeScript</span>
                    <span className="px-3 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary">Next.js</span>
                    <span className="px-3 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary">React</span>
                    <span className="px-3 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary">Tailwind CSS</span>
                    <span className="px-3 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary">Netlify</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="group block">
              <div className="grid lg:grid-cols-[30%_70%] gap-4 lg:gap-8">
                <a
                  href="https://youtu.be/KAKpj6vLnRs"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="order-2 lg:order-1 rounded border border-border group-hover:border-primary/50 transition-colors overflow-hidden aspect-video block"
                >
                  <img
                    src="/workout_extractor.png"
                    alt="Workout Extractor"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </a>
                <div className="order-1 lg:order-2">
                  <h4 className="text-foreground font-medium mb-2 group-hover:text-primary transition-colors">
                    <a
                        href="https://youtu.be/KAKpj6vLnRs"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline"
                      >
                        Workout Extractor
                        <ExternalLink className="inline-block ml-2 w-4 h-4 -translate-y-[2px] group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                      </a>
                    <span className="text-muted-foreground font-normal text-sm">|</span>{" "}
                    <a
                      href="https://github.com/svastiks/workout-extracter"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-primary transition-colors text-sm"
                    >
                      Github
                      <ExternalLink className="inline-block ml-1 w-3 h-3 -translate-y-[2px]" />
                    </a>
                  </h4>
                  <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                    Developed an <strong>LLM-powered workout extraction tool</strong> that analyzes YouTube fitness videos to generate detailed exercise plans. The application features a creator catalogue of analyzed videos, and real-time video processing.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary">Spring Boot</span>
                    <span className="px-3 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary">Java</span>
                    <span className="px-3 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary">PostgreSQL</span>
                    <span className="px-3 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary">TypeScript</span>
                    <span className="px-3 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary">Next.js</span>
                    <span className="px-3 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary">React</span>
                    <span className="px-3 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary">Tailwind CSS</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="group block">
              <div className="grid lg:grid-cols-[30%_70%] gap-4 lg:gap-8">
                <a
                  href="https://quicktravelplan.netlify.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="order-2 lg:order-1 rounded border border-border group-hover:border-primary/50 transition-colors overflow-hidden aspect-video block"
                >
                  <img
                    src="/travel-planner.png"
                    alt="Travel Planner"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </a>
                <div className="order-1 lg:order-2">
                  <h4 className="text-foreground font-medium mb-2 group-hover:text-primary transition-colors">
                    <a
                      href="https://quicktravelplan.netlify.app/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline"
                    >
                      Travel Planner
                      <ExternalLink className="inline-block ml-2 w-4 h-4 -translate-y-[2px] group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </a>
                    {" "}
                    <span className="text-muted-foreground font-normal text-sm">|</span>{" "}
                    <a
                      href="https://github.com/svastiks/travel-planner-app"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-primary transition-colors text-sm"
                    >
                      Github
                      <ExternalLink className="inline-block ml-1 w-3 h-3 -translate-y-[2px]" />
                    </a>
                  </h4>
                  <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                    Developed a travel app with <strong>REST APIs</strong> for user-login, registration, and location marking using <strong>Node.js</strong> and <strong>Express</strong> and a frontend in <strong>React</strong>. Integrated <strong>Mapbox API</strong>, enabling users to add pins on a 3D globe to mark locations <em>(I enjoy travelling!)</em>
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary">Node.js</span>
                    <span className="px-3 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary">Express</span>
                    <span className="px-3 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary">React</span>
                    <span className="px-3 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary">MongoDB</span>
                    <span className="px-3 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary">Mapbox API</span>
                    <span className="px-3 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary">React-toastify</span>
                    <span className="px-3 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary">Bcrypt</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="group block">
              <div className="grid lg:grid-cols-[30%_70%] gap-4 lg:gap-8">
                <a
                  href="https://investmentracker.netlify.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="order-2 lg:order-1 rounded border border-border group-hover:border-primary/50 transition-colors overflow-hidden aspect-video block"
                >
                  <img
                    src="/investment-planner.png"
                    alt="Investment Planner"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </a>
                <div className="order-1 lg:order-2">
                  <h4 className="text-foreground font-medium mb-2 group-hover:text-primary transition-colors">
                    <a
                      href="https://investmentracker.netlify.app/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline"
                    >
                      Investment Planner
                      <ExternalLink className="inline-block ml-2 w-4 h-4 -translate-y-[2px] group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </a>
                    {" "}
                    <span className="text-muted-foreground font-normal text-sm">|</span>{" "}
                    <a
                      href="https://github.com/svastiks/react-all-investments-portfolio"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-primary transition-colors text-sm"
                    >
                      Github
                      <ExternalLink className="inline-block ml-1 w-3 h-3 -translate-y-[2px]" />
                    </a>
                  </h4>
                  <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                    Developed a <strong>React</strong> web app utilizing <strong>live API</strong> data to track crypto investments, featuring graphical representations of weekly performance. Implemented a secure login system with <strong>Node.js, Express.js,</strong> and <strong>MongoDB</strong>, enabling user account creation and data storage. <em>(Built this to enforce consistent investment habits!)</em>
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary">React</span>
                    <span className="px-3 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary">Node.js</span>
                    <span className="px-3 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary">Express</span>
                    <span className="px-3 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary">RESTful APIs</span>
                    <span className="px-3 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary">MongoDB</span>
                    <span className="px-3 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary">Chart.js</span>
                    <span className="px-3 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary">CoinGecko API</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="text-sm text-muted-foreground">
          <p>
            Built with Next.js, React, TypeScript, and Tailwind CSS  ||  Svastik © 2025
          </p>
        </footer>
      </main>
    </div>
  )
}
