"use client";

import { useState, useEffect, use } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import {
    Copy, CreditCard, LayoutDashboard, Settings, ShoppingBag,
    Star, Users, TrendingUp, Bell, Search, Plus, MoreHorizontal,
    Coffee, ChevronDown, Filter, CalendarDays
} from "lucide-react";
import { Area, AreaChart, Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis, Cell } from "recharts";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getDictionary, Locale } from "@/i18n";

const REVENUE_DATA = [
    { name: "Mon", total: Math.floor(Math.random() * 5000) + 1000 },
    { name: "Tue", total: Math.floor(Math.random() * 5000) + 1000 },
    { name: "Wed", total: Math.floor(Math.random() * 5000) + 1000 },
    { name: "Thu", total: Math.floor(Math.random() * 5000) + 2000 },
    { name: "Fri", total: Math.floor(Math.random() * 5000) + 4000 },
    { name: "Sat", total: Math.floor(Math.random() * 5000) + 5000 },
    { name: "Sun", total: Math.floor(Math.random() * 5000) + 4000 },
];

const POPULAR_TIMES_DATA = [
    { time: "6 AM", orders: 12 },
    { time: "8 AM", orders: 45 },
    { time: "10 AM", orders: 30 },
    { time: "12 PM", orders: 60 },
    { time: "2 PM", orders: 35 },
    { time: "4 PM", orders: 55 },
    { time: "6 PM", orders: 80 },
    { time: "8 PM", orders: 95 },
    { time: "10 PM", orders: 40 },
];

const TOP_ITEMS_DATA = [
    { name: "Signature Spanish Latte", sales: 845, fill: "var(--color-primary)" },
    { name: "Ceremonial Matcha", sales: 620, fill: "var(--color-chart-2)" },
    { name: "V60 Pour Over", sales: 410, fill: "var(--color-chart-3)" },
    { name: "Pecan Caramel Cake", sales: 380, fill: "var(--color-chart-4)" },
    { name: "Flat White", sales: 310, fill: "var(--color-chart-5)" },
];

const ITEMS_DATA = [
    { id: 1, name: "Signature Spanish Latte", category: "Hot Coffee", price: "28 SAR", status: "Available", sales: 145, trend: "+12%" },
    { id: 2, name: "Ceremonial Iced Matcha", category: "Matcha", price: "32 SAR", status: "Available", sales: 120, trend: "+8%" },
    { id: 3, name: "Pecan Caramel Cake", category: "Desserts", price: "35 SAR", status: "Low Stock", sales: 85, trend: "-2%" },
    { id: 4, name: "V60 Pour Over", category: "Hot Coffee", price: "24 SAR", status: "Available", sales: 64, trend: "+4%" },
    { id: 5, name: "Rich Chocolate Pudding", category: "Desserts", price: "29 SAR", status: "Unavailable", sales: 0, trend: "0%" },
];

const ORDERS_DATA = [
    { id: "#1001", customer: "Ahmed R.", time: "2 mins ago", total: "85 SAR", items: "Signature Spanish Latte (x2), Pecan Caramel Cake", status: "Preparing", payment: "Apple Pay", type: "Dine-In" },
    { id: "#1002", customer: "Sarah M.", time: "15 mins ago", total: "32 SAR", items: "Ceremonial Iced Matcha", status: "Ready", payment: "Credit Card", type: "Takeaway" },
    { id: "#1003", customer: "Mohammed F.", time: "1 hour ago", total: "120 SAR", items: "V60 Pour Over, Pecan Caramel Cake, Rich Chocolate Pudding", status: "Delivered", payment: "Cash", type: "Dine-In" },
    { id: "#1004", customer: "Khalid A.", time: "3 hours ago", total: "28 SAR", items: "Signature Spanish Latte", status: "Delivered", payment: "Mada", type: "Takeaway" },
    { id: "#1005", customer: "Layla", time: "5 hours ago", total: "45 SAR", items: "Flat White, Butter Croissant", status: "Delivered", payment: "Apple Pay", type: "Dine-In" },
    { id: "#1006", customer: "Faisal", time: "1 day ago", total: "35 SAR", items: "Pecan Caramel Cake", status: "Cancelled", payment: "Refunded", type: "Takeaway" },
];

const fadeUpVariant: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

const staggerChildren: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

export default function AdminDashboard({
    params,
}: {
    params: Promise<{ lang: string }>;
}) {
    const { lang } = use(params);
    const [activeTab, setActiveTab] = useState("overview");
    const [dict, setDict] = useState<any>(null);

    useEffect(() => {
        getDictionary(lang as Locale).then(setDict);
    }, [lang]);

    if (!dict) return null;
    const t = dict.admin;

    return (
        <div className="flex min-h-screen bg-[#f8f9fa] dark:bg-zinc-950 pb-20">
            {/* Sidebar */}
            <aside className="fixed hidden w-72 flex-col border-r border-border/50 bg-white/80 dark:bg-black/80 backdrop-blur-xl h-full md:flex z-40 transition-all duration-300 shadow-[4px_0_24px_rgba(0,0,0,0.02)]">
                <div className="p-8 border-b border-border/50 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                        <Coffee className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                        <h2 className="font-serif font-bold text-2xl text-secondary dark:text-zinc-100">DD Cafe</h2>
                        <p className="text-[10px] text-muted-foreground font-semibold tracking-[0.2em] uppercase">{t.masterPortal}</p>
                    </div>
                </div>

                <div className="px-6 py-6">
                    <p className="text-xs font-semibold text-muted-foreground/70 uppercase tracking-wider mb-4 ml-2">{t.mainMenu}</p>
                    <nav className="flex-1 space-y-2">
                        {[
                            { name: t.overview, icon: LayoutDashboard, id: "overview" },
                            { name: t.orders, icon: ShoppingBag, id: "orders", badge: "12" },
                            { name: t.menuManager, icon: Copy, id: "menu" },
                            { name: t.customers, icon: Users, id: "customers" },
                            { name: t.reviews, icon: Star, id: "reviews" },
                        ].map((item) => (
                            <button
                                key={item.id}
                                onClick={() => setActiveTab(item.id)}
                                className={`group flex w-full items-center justify-between rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200 ${activeTab === item.id
                                    ? "bg-primary text-primary-foreground shadow-md shadow-primary/20"
                                    : "text-muted-foreground hover:bg-secondary/5 hover:text-secondary dark:hover:text-zinc-100"
                                    }`}
                            >
                                <div className="flex items-center gap-3">
                                    <item.icon className={`h-5 w-5 transition-transform duration-200 ${activeTab === item.id ? "scale-110" : "group-hover:scale-110"}`} />
                                    {item.name}
                                </div>
                                {item.badge && (
                                    <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${activeTab === item.id ? "bg-white/20 text-white" : "bg-primary/10 text-primary"
                                        }`}>
                                        {item.badge}
                                    </span>
                                )}
                            </button>
                        ))}
                    </nav>

                    <p className="text-xs font-semibold text-muted-foreground/70 uppercase tracking-wider mb-4 ml-2 mt-8">{t.preferences}</p>
                    <nav className="space-y-2">
                        <button
                            onClick={() => setActiveTab("settings")}
                            className={`group flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200 ${activeTab === "settings"
                                ? "bg-primary text-primary-foreground shadow-md shadow-primary/20"
                                : "text-muted-foreground hover:bg-secondary/5 hover:text-secondary dark:hover:text-zinc-100"
                                }`}
                        >
                            <Settings className={`h-5 w-5 transition-transform duration-200 ${activeTab === "settings" ? "rotate-90" : "group-hover:rotate-90"}`} />
                            {t.settings}
                        </button>
                    </nav>
                </div>

                <div className="mt-auto p-6 border-t border-border/50">
                    <div className="flex items-center gap-3 bg-secondary/5 p-3 rounded-xl border border-secondary/10 cursor-pointer hover:bg-secondary/10 transition-colors">
                        <Avatar>
                            <AvatarImage src="https://github.com/shadcn.png" />
                            <AvatarFallback>AD</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 overflow-hidden">
                            <p className="text-sm font-semibold truncate">{t.adminUser}</p>
                            <p className="text-xs text-muted-foreground truncate">admin@ddcafe.sa</p>
                        </div>
                        <ChevronDown className="w-4 h-4 text-muted-foreground" />
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-6 md:pl-80 max-w-[1600px] mx-auto w-full pt-10">

                {/* Top Navbar */}
                <header className="flex flex-col gap-4 mb-10 md:flex-row md:items-center md:justify-between bg-white/50 dark:bg-black/50 p-4 rounded-2xl border border-border/50 backdrop-blur-sm shadow-sm">
                    <div className="relative w-full md:w-96">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder={t.searchPlaceholder}
                            className="pl-10 bg-white dark:bg-zinc-900 border-border/50 rounded-xl focus-visible:ring-primary/50"
                        />
                    </div>
                    <div className="flex items-center gap-4">
                        <Button variant="outline" size="icon" className="rounded-xl border-border/50 bg-white dark:bg-zinc-900 shadow-sm relative">
                            <Bell className="h-5 w-5 text-muted-foreground" />
                            <span className="absolute top-2 right-2 w-2 h-2 bg-destructive rounded-full" />
                        </Button>
                        <Button className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl shadow-md shadow-primary/20 gap-2">
                            <Plus className="w-4 h-4" /> {t.addNewItem}
                        </Button>
                    </div>
                </header>

                <div className="mb-8">
                    <h1 className="text-3xl font-serif font-bold tracking-tight text-secondary dark:text-zinc-100">{t.dashboardTitle}</h1>
                    <p className="text-muted-foreground mt-1 text-sm md:text-base">{t.dashboardSubtitle}</p>
                </div>

                <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
                    <TabsList className="bg-white/50 dark:bg-black/50 border border-border/50 p-1 rounded-xl w-full justify-start overflow-x-auto h-auto no-scrollbar md:hidden mb-6 shadow-sm backdrop-blur-sm">
                        <TabsTrigger value="overview" className="rounded-lg data-[state=active]:bg-white dark:data-[state=active]:bg-zinc-800 data-[state=active]:shadow-sm">{t.overview}</TabsTrigger>
                        <TabsTrigger value="orders" className="rounded-lg data-[state=active]:bg-white dark:data-[state=active]:bg-zinc-800 data-[state=active]:shadow-sm">{t.orders}</TabsTrigger>
                        <TabsTrigger value="menu" className="rounded-lg data-[state=active]:bg-white dark:data-[state=active]:bg-zinc-800 data-[state=active]:shadow-sm">{t.menuManager}</TabsTrigger>
                    </TabsList>

                    <TabsContent value="overview" className="space-y-8">
                        <motion.div
                            variants={staggerChildren}
                            initial="hidden"
                            animate="visible"
                            className="grid gap-6 md:grid-cols-2 lg:grid-cols-4"
                        >
                            {[
                                { title: t.totalRevenue, value: "45,231.89 SAR", trend: "+20.1%", trendUp: true, icon: CreditCard },
                                { title: t.totalOrders, value: "2,350", trend: "+12.5%", trendUp: true, icon: ShoppingBag },
                                { title: t.activeCustomers, value: "12", trend: "Live now", trendUp: true, icon: Users },
                                { title: t.averageRating, value: "4.8", trend: "+0.2 this week", trendUp: true, icon: Star },
                            ].map((stat, i) => (
                                <motion.div key={i} variants={fadeUpVariant}>
                                    <Card className="border-border/50 shadow-sm hover:shadow-md transition-shadow duration-300 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm rounded-2xl overflow-hidden">
                                        <CardHeader className="flex flex-row items-center justify-between pb-2 pt-6">
                                            <CardTitle className="text-sm font-semibold text-muted-foreground">{stat.title}</CardTitle>
                                            <div className={`p-2 rounded-lg ${i === 0 ? 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400' : i === 1 ? 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400' : i === 2 ? 'bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400' : 'bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400'}`}>
                                                <stat.icon className="h-4 w-4" />
                                            </div>
                                        </CardHeader>
                                        <CardContent className="pb-6">
                                            <div className="text-3xl font-bold font-serif tracking-tight text-secondary dark:text-zinc-100">{stat.value}</div>
                                            <div className="flex items-center gap-1 mt-2 text-xs font-medium text-muted-foreground">
                                                {stat.trendUp && <TrendingUp className="w-3 h-3 text-emerald-500" />}
                                                <span className={stat.trendUp ? "text-emerald-500" : ""}>{stat.trend}</span>
                                                <span className="opacity-70">from last month</span>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </motion.div>
                            ))}
                        </motion.div>

                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
                            <motion.div variants={fadeUpVariant} className="col-span-4">
                                <Card className="border-border/50 shadow-sm bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm rounded-2xl h-full flex flex-col">
                                    <CardHeader>
                                        <CardTitle className="font-serif">{t.revenueForecast}</CardTitle>
                                        <CardDescription>{t.revenueDescription}</CardDescription>
                                    </CardHeader>
                                    <CardContent className="pl-0 h-[350px] w-full mt-auto pb-6">
                                        <ResponsiveContainer width="100%" height="100%">
                                            <AreaChart data={REVENUE_DATA} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                                                <defs>
                                                    <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                                                        <stop offset="5%" stopColor="#4ade80" stopOpacity={0.4} />
                                                        <stop offset="95%" stopColor="#4ade80" stopOpacity={0} />
                                                    </linearGradient>
                                                </defs>
                                                <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickMargin={10} />
                                                <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `SAR ${value}`} tickMargin={10} />
                                                <Tooltip
                                                    contentStyle={{ borderRadius: "12px", border: "1px solid rgba(0,0,0,0.1)", boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1)", backgroundColor: "rgba(255,255,255,0.9)", backdropFilter: "blur(4px)" }}
                                                    itemStyle={{ color: "#166534", fontWeight: 600 }}
                                                />
                                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(0,0,0,0.05)" />
                                                <Area type="monotone" dataKey="total" stroke="#4ade80" strokeWidth={4} fillOpacity={1} fill="url(#colorTotal)" activeDot={{ r: 6, strokeWidth: 0, fill: "#166534" }} />
                                            </AreaChart>
                                        </ResponsiveContainer>
                                    </CardContent>
                                </Card>
                            </motion.div>

                            <motion.div variants={fadeUpVariant} className="col-span-3">
                                <Card className="border-border/50 shadow-sm bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm rounded-2xl h-full flex flex-col">
                                    <CardHeader className="flex flex-row items-center justify-between">
                                        <div>
                                            <CardTitle className="font-serif">{t.popularTimes}</CardTitle>
                                            <CardDescription>{t.popularDescription}</CardDescription>
                                        </div>
                                        <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                                            <MoreHorizontal className="h-4 w-4" />
                                        </Button>
                                    </CardHeader>
                                    <CardContent className="flex-1 pb-6 w-full h-[350px]">
                                        <ResponsiveContainer width="100%" height="100%">
                                            <BarChart data={POPULAR_TIMES_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                                <XAxis dataKey="time" stroke="#888888" fontSize={10} tickLine={false} axisLine={false} tickMargin={10} interval="preserveStartEnd" />
                                                <YAxis stroke="#888888" fontSize={10} tickLine={false} axisLine={false} tickMargin={10} />
                                                <Tooltip
                                                    cursor={{ fill: 'rgba(0,0,0,0.05)' }}
                                                    contentStyle={{ borderRadius: "12px", border: "1px solid rgba(0,0,0,0.1)", boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1)", backgroundColor: "rgba(255,255,255,0.9)", backdropFilter: "blur(4px)" }}
                                                />
                                                <Bar dataKey="orders" fill="var(--color-chart-4)" radius={[4, 4, 0, 0]} barSize={20} />
                                            </BarChart>
                                        </ResponsiveContainer>
                                    </CardContent>
                                    <CardFooter className="pt-0 border-t border-border/50 bg-muted/10 p-4">
                                        <div className="flex justify-between items-center w-full text-sm">
                                            <span className="text-muted-foreground font-medium">Busiest hour: <span className="text-secondary dark:text-zinc-100 font-bold">8 PM (95 orders)</span></span>
                                        </div>
                                    </CardFooter>
                                </Card>
                            </motion.div>
                        </div>

                        {/* New Row: Top Items & Insights */}
                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                            <motion.div variants={fadeUpVariant} className="col-span-2">
                                <Card className="border-border/50 shadow-sm bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm rounded-2xl h-full flex flex-col">
                                    <CardHeader>
                                        <CardTitle className="font-serif">{t.topItems}</CardTitle>
                                        <CardDescription>{t.topItemsDescription}</CardDescription>
                                    </CardHeader>
                                    <CardContent className="pl-0 h-[280px] w-full mt-auto pb-6">
                                        <ResponsiveContainer width="100%" height="100%">
                                            <BarChart layout="vertical" data={TOP_ITEMS_DATA} margin={{ top: 0, right: 30, left: 40, bottom: 0 }}>
                                                <XAxis type="number" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickMargin={10} hide />
                                                <YAxis dataKey="name" type="category" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickMargin={10} width={150} />
                                                <Tooltip
                                                    cursor={{ fill: 'rgba(0,0,0,0.05)' }}
                                                    contentStyle={{ borderRadius: "12px", border: "1px solid rgba(0,0,0,0.1)", boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1)", backgroundColor: "rgba(255,255,255,0.9)", backdropFilter: "blur(4px)" }}
                                                />
                                                <Bar dataKey="sales" radius={[0, 4, 4, 0]} barSize={24} label={{ position: 'right', fill: '#888', fontSize: 12, fontWeight: 600 }}>
                                                    {TOP_ITEMS_DATA.map((entry, index) => (
                                                        <Cell key={`cell-${index}`} fill={entry.fill} />
                                                    ))}
                                                </Bar>
                                            </BarChart>
                                        </ResponsiveContainer>
                                    </CardContent>
                                    <CardFooter className="border-t border-border/50 bg-muted/10 p-4">
                                        <Button variant="outline" className="w-full rounded-xl border-border/50 text-muted-foreground hover:text-secondary">View Full Menu Analytics</Button>
                                    </CardFooter>
                                </Card>
                            </motion.div>

                            <motion.div variants={fadeUpVariant} className="col-span-1 space-y-6">
                                <Card className="border-border/50 shadow-sm bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
                                    <CardHeader className="pb-2">
                                        <CardTitle className="text-lg font-serif">AI Insight</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-sm text-secondary dark:text-zinc-200 leading-relaxed">
                                            Sales for <span className="font-bold text-primary">Ceremonial Iced Matcha</span> are projected to increase by 15% this weekend. Consider increasing stock levels by Friday.
                                        </p>
                                    </CardContent>
                                </Card>

                                <Card className="border-border/50 shadow-sm bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm rounded-2xl">
                                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                                        <CardTitle className="text-lg font-serif">Customer Retention</CardTitle>
                                        <Users className="w-4 h-4 text-muted-foreground" />
                                    </CardHeader>
                                    <CardContent>
                                        <div className="flex items-end gap-2 mb-2">
                                            <span className="text-3xl font-bold tracking-tight text-secondary dark:text-zinc-100">68%</span>
                                            <span className="text-sm text-emerald-500 font-bold mb-1">+4%</span>
                                        </div>
                                        <p className="text-xs text-muted-foreground">Of customers return within 30 days.</p>
                                        <div className="w-full bg-secondary/10 h-2 rounded-full mt-4 overflow-hidden">
                                            <div className="bg-primary h-full rounded-full" style={{ width: '68%' }} />
                                        </div>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        </div>
                    </TabsContent>

                    <TabsContent value="orders" className="space-y-6">
                        <motion.div variants={fadeUpVariant} initial="hidden" animate="visible">
                            <Card className="border-border/50 shadow-sm bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm rounded-2xl overflow-hidden">
                                <CardHeader className="bg-muted/30 border-b border-border/50 pb-4">
                                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                        <div>
                                            <CardTitle className="font-serif">Active Orders</CardTitle>
                                            <CardDescription className="mt-1">Manage and track your café's daily orders.</CardDescription>
                                        </div>
                                        <div className="flex gap-2">
                                            <Button variant="outline" size="sm" className="rounded-lg bg-white dark:bg-zinc-900 gap-2">
                                                <Filter className="w-4 h-4" /> Filter
                                            </Button>
                                            <Button variant="outline" size="sm" className="rounded-lg bg-white dark:bg-zinc-900 gap-2">
                                                <CalendarDays className="w-4 h-4" /> Today
                                            </Button>
                                        </div>
                                    </div>

                                    <div className="flex gap-2 mt-4 overflow-x-auto no-scrollbar pb-1">
                                        {["All Orders", "Pending (2)", "Preparing (1)", "Ready (1)", "Delivered", "Cancelled"].map((status, idx) => (
                                            <Badge key={idx} variant={idx === 0 ? "default" : "outline"} className={`whitespace-nowrap cursor-pointer hover:bg-primary/20 hover:text-primary transition-colors ${idx === 0 ? "bg-primary/10 text-primary border-transparent" : "bg-white dark:bg-zinc-900 border-border/50"}`}>
                                                {status}
                                            </Badge>
                                        ))}
                                    </div>
                                </CardHeader>
                                <CardContent className="p-0">
                                    <div className="overflow-x-auto">
                                        <Table>
                                            <TableHeader className="bg-muted/10">
                                                <TableRow className="border-border/50 hover:bg-transparent">
                                                    <TableHead className="pl-6 font-semibold w-24">Order ID</TableHead>
                                                    <TableHead className="font-semibold">Customer & Items</TableHead>
                                                    <TableHead className="font-semibold">Type</TableHead>
                                                    <TableHead className="font-semibold">Payment</TableHead>
                                                    <TableHead className="font-semibold">Status</TableHead>
                                                    <TableHead className="text-right font-semibold">Total</TableHead>
                                                </TableRow>
                                            </TableHeader>
                                            <TableBody>
                                                {ORDERS_DATA.map((order, i) => (
                                                    <TableRow key={i} className="border-border/50 hover:bg-muted/30 transition-colors cursor-pointer group">
                                                        <TableCell className="pl-6 font-semibold text-primary py-4">{order.id}</TableCell>
                                                        <TableCell>
                                                            <div className="flex flex-col gap-1">
                                                                <span className="font-bold text-secondary dark:text-zinc-100">{order.customer}</span>
                                                                <span className="text-xs text-muted-foreground truncate max-w-[250px]">{order.items}</span>
                                                                <span className="text-[10px] opacity-70 mt-1">{order.time}</span>
                                                            </div>
                                                        </TableCell>
                                                        <TableCell className="text-sm">{order.type}</TableCell>
                                                        <TableCell>
                                                            <div className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground bg-secondary/5 px-2 py-1 rounded w-fit">
                                                                {order.payment === "Cash" ? <div className="w-2 h-2 rounded-full bg-emerald-500" /> : <CreditCard className="w-3 h-3" />}
                                                                {order.payment}
                                                            </div>
                                                        </TableCell>
                                                        <TableCell>
                                                            <Badge variant="outline" className={`border-none px-2.5 py-1 text-xs font-semibold shadow-sm
                                ${order.status === 'Preparing' ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/30' : ''}
                                ${order.status === 'Ready' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30' : ''}
                                ${order.status === 'Delivered' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30' : ''}
                                ${order.status === 'Cancelled' ? 'bg-destructive/10 text-destructive dark:bg-destructive/20' : ''}
                                ${order.status === 'Pending' ? 'bg-muted text-muted-foreground' : ''}
                              `}>
                                                                {order.status}
                                                            </Badge>
                                                        </TableCell>
                                                        <TableCell className="text-right font-bold">{order.total}</TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </div>
                                </CardContent>
                                <CardFooter className="border-t border-border/50 bg-muted/10 p-4 flex justify-between items-center text-sm text-muted-foreground">
                                    <span>Showing 6 of 234 orders</span>
                                    <div className="flex gap-1">
                                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0" disabled>1</Button>
                                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">2</Button>
                                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">3</Button>
                                        <span className="flex items-center justify-center px-1">...</span>
                                        <Button variant="ghost" size="sm" className="h-8 px-2">Next</Button>
                                    </div>
                                </CardFooter>
                            </Card>
                        </motion.div>
                    </TabsContent>

                    <TabsContent value="menu">
                        <motion.div variants={fadeUpVariant} initial="hidden" animate="visible" transition={{ delay: 0.4 }}>
                            <Card className="border-border/50 shadow-sm bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm rounded-2xl mt-8 overflow-hidden">
                                <CardHeader className="bg-muted/30 border-b border-border/50">
                                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                        <div>
                                            <CardTitle className="font-serif">Menu Inventory</CardTitle>
                                            <CardDescription className="mt-1">Manage item availability, pricing, and view item-level performance.</CardDescription>
                                        </div>
                                        <div className="flex gap-2">
                                            <Button variant="outline" size="sm" className="rounded-lg bg-white dark:bg-zinc-900">Export</Button>
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent className="p-0">
                                    <div className="overflow-x-auto">
                                        <Table>
                                            <TableHeader className="bg-muted/10">
                                                <TableRow className="border-border/50 hover:bg-transparent">
                                                    <TableHead className="pl-6 font-semibold">Item</TableHead>
                                                    <TableHead className="font-semibold">Category</TableHead>
                                                    <TableHead className="font-semibold">Status</TableHead>
                                                    <TableHead className="font-semibold">Price</TableHead>
                                                    <TableHead className="text-right font-semibold">Total Sales</TableHead>
                                                    <TableHead className="text-center font-semibold">Trend</TableHead>
                                                    <TableHead className="text-right pr-6 font-semibold">Actions</TableHead>
                                                </TableRow>
                                            </TableHeader>
                                            <TableBody>
                                                {ITEMS_DATA.map((item) => (
                                                    <TableRow key={item.id} className="border-border/50 hover:bg-muted/30 transition-colors">
                                                        <TableCell className="pl-6 font-bold text-secondary dark:text-zinc-100 py-4">{item.name}</TableCell>
                                                        <TableCell className="text-muted-foreground font-medium">{item.category}</TableCell>
                                                        <TableCell>
                                                            <Badge
                                                                variant="outline"
                                                                className={`border-none px-2.5 py-1 text-xs font-semibold shadow-sm
                                  ${item.status === 'Available' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30' : ''}
                                  ${item.status === 'Low Stock' ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/30' : ''}
                                  ${item.status === 'Unavailable' ? 'bg-destructive/10 text-destructive dark:bg-destructive/20' : ''}
                                `}
                                                            >
                                                                {item.status}
                                                            </Badge>
                                                        </TableCell>
                                                        <TableCell className="font-semibold">{item.price}</TableCell>
                                                        <TableCell className="text-right font-medium">{item.sales}</TableCell>
                                                        <TableCell className="text-center">
                                                            <span className={`text-xs font-bold ${item.trend.startsWith('+') ? 'text-emerald-500' : item.trend.startsWith('-') ? 'text-destructive' : 'text-muted-foreground'}`}>
                                                                {item.trend}
                                                            </span>
                                                        </TableCell>
                                                        <TableCell className="text-right pr-6">
                                                            <Button variant="ghost" size="sm" className="h-8 rounded-lg hover:bg-secondary/10 hover:text-secondary font-medium">Edit</Button>
                                                        </TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    </TabsContent>
                </Tabs>
            </main>
        </div>
    );
}
