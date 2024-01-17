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
      href: "/user/1/tasks",
    },
    {
      title: "Pomodoro",
      href: "/pomodoro"
    },
    {
      title: "Analytics",
      href: "/user/1/analytics",
    },
    {
      title: "About",
      href: "/about",
    },
  ],
  links: {
    github: "https://github.com/abyanmajid/kaori",
  },
}
