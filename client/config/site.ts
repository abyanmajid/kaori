export type SiteConfig = typeof siteConfig

export const siteConfig = {
  name: "Kaori",
  description:
    "Beautifully designed components built with Radix UI and Tailwind CSS.",
  mainNav: [
    {
      title: "Home",
      href: "/",
    },
    {
      title: "Tasks",
      href: "tasks",
    },
    {
      title: "Pomodoro",
      href: "/pomodoro"
    },
    {
      title: "Analytics",
      href: "analytics",
    },
  ],
  links: {
    github: "https://github.com/abyanmajid/kaori",
  },
}
