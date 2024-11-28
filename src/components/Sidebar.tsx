import { cn } from "@/lib/utils"
import { Button } from "./ui/button"
import { motion } from "framer-motion"
import {
  MessageSquare,
  LayoutGrid,
  FolderKanban,
  Settings,
  HelpCircle,
  LogOut,
  Brain
} from "lucide-react"
import { useNavigate } from "react-router-dom"

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

const menuItems = [
  {
    icon: Brain,
    label: "Dashboard",
    variant: "secondary" as const,
    iconClassName: "text-white",
    href: "/",
  },
    {
      icon: MessageSquare,
      label: "Atri-1.0",
      variant: "secondary" as const,
      iconClassName: "text-blue-500",
      href: "/atri-1.0",
    },
    {
      icon: LayoutGrid,
      label: "Nola-2.5 (Coming soon)",
      variant: "ghost" as const,
      iconClassName: "text-purple-500",
      // href: "/atri-2.5",
    },
    {
      icon: FolderKanban,
      label: "Nola-2.5 (Coming soon)",
      variant: "ghost" as const,
      iconClassName: "text-green-500",
      // href: "/atri-2.5",
    },
    {
      icon: Settings,
      label: "Settings",
      variant: "ghost" as const,
      iconClassName: "text-gray-500",
      // href: "/settings",
    },
    {
      icon: HelpCircle,
      label: "Updates & FAQ",
      variant: "ghost" as const,
      iconClassName: "text-orange-500",
      // href: "/updates",
    },
  ]

const sidebarVariants = {
  hidden: { x: -300, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 20,
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { x: -20, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
  },
}

export function Sidebar({ className }: SidebarProps) {
  const navigate = useNavigate();
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={sidebarVariants}
      className={cn(" h-[calc(100vh-2rem)] bg-background border-r flex flex-col justify-between pr-6", className)}
    >
        <div>
        <div className="p-4">
            <div className="flex items-center gap-2">
              <Brain className="h-8 w-8 text-purple-600" />
              <span className="font-bold text-2xl bg-gradient-to-r from-purple-600 to-blue-600 text-transparent bg-clip-text">
                Nola
              </span>
            </div>
          </div>
          <div className="space-y-1">
          {menuItems.map((item, index) => (
    <motion.div key={item.label} variants={itemVariants}>
      <Button
        variant={item.variant}
        className="w-full justify-start hover:scale-105 transition-transform"
        onClick={() => item.href && navigate(item.href)}
      >
        <item.icon className={`mr-2 h-4 w-4 ${item.iconClassName}`} />
        {item.label}
      </Button>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-4">
        <motion.div
          variants={itemVariants}
          className=""
        >
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 p-4"
          >
            <h3 className="text-white font-semibold mb-2">Pro Plan</h3>
            <p className="text-white/80 text-sm mb-4">
              Strengthen artificial intelligence: get plan!
            </p>
            <div className="flex items-center justify-between">
              <span className="text-white font-bold">$10 / mo</span>
              <Button
                size="sm"
                variant="secondary"
                className="bg-white text-black hover:bg-white/90"
              >
                Get PRO
              </Button>
            </div>
          </motion.div>
        </motion.div>

        <motion.div variants={itemVariants} className="">
          <Button
            variant="ghost"
            className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-100/50"
          >
            <LogOut className="mr-2 h-4 w-4" />
            Log out
          </Button>
        </motion.div>
        </div>
    </motion.div>
  )
}