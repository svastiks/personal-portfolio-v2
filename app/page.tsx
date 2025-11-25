"use client"

import { useEffect, useState } from "react"
import { Github, Linkedin, Mail, ExternalLink, Moon, Sun } from "lucide-react"

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState("about")
  const [theme, setTheme] = useState<"light" | "dark">("light")
  const [expandedRecommendations, setExpandedRecommendations] = useState<Set<number>>(new Set())

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

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  const recommendations = [
    {
      text: `Svastik was a tremendous contributor to the team. He takes ownership and pride in is work to deliver high quality results. 
      This started with good technical understanding of the problem, even as a junior member of the team he took on several difficult projects requiring architecting the system first and documenting it for review. This then extended to the implementation, delivering clean, robust, tested code. And finally delivery and shipping, which often included him testing end to end to ensure quality.
      In a very short period of tenure there are critical features, without which, theScore Bet platform would not be what it is today, without Svastik.`,
      author: "Igor Svistoun",
      title: "Engineering Manager, Accounts Core @ PENN Entertainment Inc.",
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
      title: "Frontend Develope @ 4Pay Inc.",
      linkedinUrl: "https://www.linkedin.com/in/svastiksharma/details/recommendations/",
    }
  ]

  return (
    <div className="min-h-screen lg:flex">
      {/* Left Sidebar - Fixed */}
      <aside className="lg:sticky lg:top-0 lg:h-screen lg:w-[40%] lg:flex lg:flex-col lg:justify-start p-8 lg:px-16 lg:py-24">
        <div className="max-w-md mx-auto w-full">
          <div className="flex items-center gap-4 mb-3">
            <img
              src="/about-image.jpeg"
              alt="Svastik Sharma"
              className="w-25 h-20 rounded-full border-2"
            />
            <div>
              <h1 className="text-4xl lg:text-5xl font-bold text-foreground">Svastik Sharma</h1>
              <h2 className="text-lg lg:text-xl font-medium text-foreground mt-1">Software Engineer</h2>
            </div>
          </div>
          <p className="text-muted-foreground max-w-xs mb-16">
          </p>

          {/* Navigation */}
          <nav className="hidden lg:block mb-16">
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
          <div className="flex gap-5 items-center">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <Github className="w-6 h-6" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <Linkedin className="w-6 h-6" />
            </a>
            <a href="mailto:your@email.com" className="text-muted-foreground hover:text-foreground transition-colors">
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
          <div className="lg:hidden mb-12">
            <h3 className="text-sm font-bold uppercase tracking-widest text-foreground mb-4">About</h3>
          </div>
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              Hey, my name is Svastik Sharma and I'm a software engineer based in Toronto, Canada 🇨🇦.
              I went to York University in Toronto where I studied Software Engineering (Big Data Stream).
              
              <br />
              <br />

              I'm passioante about building secure, scalable and well-tested software, with careful consideration for the infrastructure that supports it and the platform it's deployed on.
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
          <div className="lg:hidden mb-12">
            <h3 className="text-sm font-bold uppercase tracking-widest text-foreground mb-4">Recommendations</h3>
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
                    <a
                      href={rec.linkedinUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:text-primary/80 transition-colors text-xs flex items-center gap-1"
                    >
                      View on LinkedIn
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              )
            })}
          </div>
        </section>

        {/* Experience Section */}
        <section id="experience" className="mb-24 scroll-mt-24">
          <div className="lg:hidden mb-12">
            <h3 className="text-sm font-bold uppercase tracking-widest text-foreground mb-4">Experience</h3>
          </div>
          <div className="space-y-12">
            <div className="group">
              <div className="grid lg:grid-cols-[25%_75%] gap-2 lg:gap-8">
                <div className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mt-1">
                  Sep 2025 — Present
                </div>
                <div>
                  <h4 className="text-foreground font-medium mb-2 group-hover:text-primary transition-colors">
                    Software Engineer (Accounts Core) | Full Time
                    <br /> PENN Entertainment Inc.
                    <ExternalLink className="inline-block ml-2 w-4 h-4 -translate-y-[2px] group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </h4>
                  <p className="text-sm text-muted-foreground mb-4 leading-relaxed">

                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary">
                      Elixir
                    </span>
                    <span className="px-3 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary">
                      PostgreSQL
                    </span>
                    <span className="px-3 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary">
                      Kubernetes
                    </span>
                    <span className="px-3 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary">
                      CI/CD
                    </span>
                    <span className="px-3 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary">
                      PostgreSQL
                    </span>
                    <span className="px-3 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary">
                      TypeScript
                    </span>
                    <span className="px-3 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary">React</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="group">
              <div className="grid lg:grid-cols-[25%_75%] gap-2 lg:gap-8">
                <div className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mt-1">
                  May 2025 - Aug 2025
                </div>
                <div>
                  <h4 className="text-foreground font-medium mb-2 group-hover:text-primary transition-colors">
                  Software Engineer (Accounts Core) | Coop
                  <br /> PENN Entertainment Inc.
                    <ExternalLink className="inline-block ml-2 w-4 h-4 -translate-y-[2px] group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </h4>
                  <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary">
                      Elixir
                    </span>
                    <span className="px-3 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary">
                      PostgreSQL
                    </span>
                    <span className="px-3 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary">
                      Kubernetes
                    </span>
                    <span className="px-3 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary">
                      CI/CD
                    </span>
                    <span className="px-3 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary">
                      PostgreSQL
                    </span>
                    <span className="px-3 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary">
                      TypeScript
                    </span>
                    <span className="px-3 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary">React</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="group">
              <div className="grid lg:grid-cols-[25%_75%] gap-2 lg:gap-8">
                <div className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mt-1">
                  2016 — 2018
                </div>
                <div>
                  <h4 className="text-foreground font-medium mb-2 group-hover:text-primary transition-colors">
                    Junior Developer · First Company
                    <ExternalLink className="inline-block ml-2 w-4 h-4 -translate-y-[2px] group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </h4>
                  <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                    Collaborated with a team of developers to build and maintain responsive web applications for various
                    clients. Gained experience in modern web technologies and agile development practices.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary">
                      HTML & CSS
                    </span>
                    <span className="px-3 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary">
                      JavaScript
                    </span>
                    <span className="px-3 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary">
                      jQuery
                    </span>
                    <span className="px-3 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary">
                      WordPress
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12">
            <a
              href="/resume.pdf"
              target="_blank"
              className="inline-flex items-center text-sm font-medium text-foreground hover:text-primary transition-colors group"
              rel="noreferrer"
            >
              View Full Resume
              <ExternalLink className="ml-2 w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </a>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="mb-24 scroll-mt-24">
          <div className="lg:hidden mb-12">
            <h3 className="text-sm font-bold uppercase tracking-widest text-foreground mb-4">Projects</h3>
          </div>
          <div className="space-y-12">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="group block">
              <div className="grid lg:grid-cols-[30%_70%] gap-4 lg:gap-8">
                <div className="order-2 lg:order-1">
                  <img
                    src="/web-application-dashboard.png"
                    alt="Project screenshot"
                    className="rounded border border-border w-full aspect-video object-cover group-hover:border-primary/50 transition-colors"
                  />
                </div>
                <div className="order-1 lg:order-2">
                  <h4 className="text-foreground font-medium mb-2 group-hover:text-primary transition-colors">
                    Build a Spotify Connected App
                    <ExternalLink className="inline-block ml-2 w-4 h-4 -translate-y-[2px] group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </h4>
                  <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                    A comprehensive video course that teaches students how to build a web app with the Spotify Web API.
                    Topics covered include user auth flows, Node, Express, React, Styled Components, and more.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary">React</span>
                    <span className="px-3 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary">
                      Express
                    </span>
                    <span className="px-3 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary">
                      Spotify API
                    </span>
                    <span className="px-3 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary">
                      Node.js
                    </span>
                  </div>
                </div>
              </div>
            </a>

            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="group block">
              <div className="grid lg:grid-cols-[30%_70%] gap-4 lg:gap-8">
                <div className="order-2 lg:order-1">
                  <img
                    src="/spotify-profile-interface.jpg"
                    alt="Project screenshot"
                    className="rounded border border-border w-full aspect-video object-cover group-hover:border-primary/50 transition-colors"
                  />
                </div>
                <div className="order-1 lg:order-2">
                  <h4 className="text-foreground font-medium mb-2 group-hover:text-primary transition-colors">
                    Spotify Profile
                    <ExternalLink className="inline-block ml-2 w-4 h-4 -translate-y-[2px] group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </h4>
                  <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                    A web app for visualizing personalized Spotify data. View your top artists, top tracks, recently
                    played tracks, and detailed audio information about each track. Create and save new playlists of
                    recommended tracks based on your existing playlists and more.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary">React</span>
                    <span className="px-3 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary">
                      Styled Components
                    </span>
                    <span className="px-3 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary">
                      Express
                    </span>
                    <span className="px-3 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary">
                      Spotify API
                    </span>
                  </div>
                </div>
              </div>
            </a>

            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="group block">
              <div className="grid lg:grid-cols-[30%_70%] gap-4 lg:gap-8">
                <div className="order-2 lg:order-1">
                  <img
                    src="/dark-code-editor.png"
                    alt="Project screenshot"
                    className="rounded border border-border w-full aspect-video object-cover group-hover:border-primary/50 transition-colors"
                  />
                </div>
                <div className="order-1 lg:order-2">
                  <h4 className="text-foreground font-medium mb-2 group-hover:text-primary transition-colors">
                    Halcyon Theme
                    <ExternalLink className="inline-block ml-2 w-4 h-4 -translate-y-[2px] group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </h4>
                  <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                    A minimal, dark blue theme for VS Code, Sublime Text, Atom, iTerm, and more. Available on Visual
                    Studio Marketplace, Package Control, Atom Package Manager, and npm.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary">
                      VS Code
                    </span>
                    <span className="px-3 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary">
                      Sublime Text
                    </span>
                    <span className="px-3 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary">Atom</span>
                    <span className="px-3 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary">
                      iTerm2
                    </span>
                  </div>
                </div>
              </div>
            </a>
          </div>

          <div className="mt-12">
            <a
              href="https://github.com"
              target="_blank"
              className="inline-flex items-center text-sm font-medium text-foreground hover:text-primary transition-colors group"
              rel="noreferrer"
            >
              View Full Project Archive
              <ExternalLink className="ml-2 w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </a>
          </div>
        </section>

        {/* Footer */}
        <footer className="text-sm text-muted-foreground">
          <p>
            Designed in Figma and coded in Visual Studio Code by yours truly. Built with Next.js and Tailwind CSS,
            deployed with Vercel.
          </p>
        </footer>
      </main>
    </div>
  )
}
