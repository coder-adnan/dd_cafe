"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Plus, Minus, ShoppingBag } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { getDictionary, Locale } from "@/i18n";
import { use } from "react";

const CATEGORY_KEYS = ["all", "hotCoffee", "coldCoffee", "matcha", "desserts"];

const MENU_ITEMS = [
    {
        id: 1,
        name: "Signature Spanish Latte",
        description: "Espresso with sweetened condensed milk and cinnamon.",
        price: 28,
        category: "Hot Coffee",
        image: "https://images.unsplash.com/photo-1572442388796-11668a67e53d?auto=format&fit=crop&q=80"
    },
    {
        id: 2,
        name: "Iced Spanish Latte",
        description: "Our signature Spanish latte, served over ice.",
        price: 30,
        category: "Cold Coffee",
        image: "https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&q=80"
    },
    {
        id: 3,
        name: "Ceremonial Iced Matcha",
        description: "Premium ceremonial grade matcha whisked with your choice of milk.",
        price: 32,
        category: "Matcha",
        image: "https://images.unsplash.com/photo-1536514072410-5019a3c69182?auto=format&fit=crop&q=80"
    },
    {
        id: 4,
        name: "V60 Pour Over",
        description: "Single origin specialty beans brewed to perfection.",
        price: 24,
        category: "Hot Coffee",
        image: "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&q=80"
    },
    {
        id: 5,
        name: "Cold Brew",
        description: "Steeped for 24 hours for a smooth, bold flavor.",
        price: 26,
        category: "Cold Coffee",
        image: "https://images.unsplash.com/photo-1504630083234-14187a9df0f5?auto=format&fit=crop&q=80"
    },
    {
        id: 6,
        name: "Matcha Latte",
        description: "Warm matcha with perfectly steamed milk.",
        price: 28,
        category: "Matcha",
        image: "https://images.unsplash.com/photo-1515823064-d6e0c04616a7?auto=format&fit=crop&q=80"
    },
    {
        id: 7,
        name: "Pecan Caramel Cake",
        description: "Moist sponge slice with caramel glaze and toasted pecans.",
        price: 35,
        category: "Desserts",
        image: "https://images.unsplash.com/photo-1621303837174-89787a7d4729?auto=format&fit=crop&q=80"
    },
    {
        id: 8,
        name: "Rich Chocolate Pudding",
        description: "Decadent dark chocolate pudding with sea salt.",
        price: 29,
        category: "Desserts",
        image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&q=80"
    },
    {
        id: 9,
        name: "DD Signature Affogato",
        description: "Vanilla bean gelato drowned in a shot of signature espresso.",
        price: 35,
        category: "Special Items",
        image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&q=80"
    }
];

export default function MenuPage({
    params,
}: {
    params: Promise<{ lang: string }>;
}) {
    const { lang } = use(params);
    const [activeCategory, setActiveCategory] = useState("all");
    const [searchQuery, setSearchQuery] = useState("");
    const [cartCount, setCartCount] = useState(0);
    const [dict, setDict] = useState<any>(null);

    useEffect(() => {
        getDictionary(lang as Locale).then(setDict);
    }, [lang]);

    if (!dict) return null;
    const t = dict.menu;

    const filteredItems = MENU_ITEMS.filter(item => {
        let itemCatKey = "all";
        if (item.category === "Hot Coffee") itemCatKey = "hotCoffee";
        if (item.category === "Cold Coffee") itemCatKey = "coldCoffee";
        if (item.category === "Matcha") itemCatKey = "matcha";
        if (item.category === "Desserts") itemCatKey = "desserts";

        const matchesCategory = activeCategory === "all" || itemCatKey === activeCategory;
        const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.description.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    return (
        <div className="container mx-auto px-4 py-12 md:py-20 min-h-screen">
            {/* Header */}
            <div className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-serif font-bold text-secondary mb-4">{t.title}</h1>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                    {t.subtitle}
                </p>
            </div>

            {/* Filters & Search */}
            <div className="flex flex-col md:flex-row gap-6 justify-between items-center mb-12">
                <div className="flex bg-card p-1 rounded-full shadow-sm border border-border overflow-x-auto w-full md:w-auto pb-1 md:pb-1 no-scrollbar">
                    {CATEGORY_KEYS.map(categoryKey => (
                        <button
                            key={categoryKey}
                            onClick={() => setActiveCategory(categoryKey)}
                            className={`px-5 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-300 ${activeCategory === categoryKey
                                ? "bg-primary text-primary-foreground shadow-md"
                                : "text-secondary-foreground hover:bg-secondary/10"
                                }`}
                        >
                            {t[categoryKey] || categoryKey}
                        </button>
                    ))}
                </div>

                <div className="relative w-full md:w-72">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                        type="text"
                        placeholder={t.searchPlaceholder}
                        className="pl-10 rounded-full bg-card border-border border"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
            </div>

            {/* Floating Cart Indicator */}
            <AnimatePresence>
                {cartCount > 0 && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, y: 50 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8, y: 50 }}
                        className="fixed bottom-6 inset-x-0 mx-auto w-[90%] md:w-[400px] z-50 pointer-events-none"
                    >
                        <div className="bg-secondary text-secondary-foreground rounded-full shadow-2xl p-4 flex items-center justify-between border border-border/20 pointer-events-auto">
                            <div className="flex items-center gap-3">
                                <div className="bg-primary/20 p-2 rounded-full">
                                    <ShoppingBag className="w-5 h-5 text-primary" />
                                </div>
                                <span className="font-semibold">{cartCount} items</span>
                            </div>
                            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-6">
                                {t.checkout}
                            </Button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Menu Grid */}
            <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-32">
                <AnimatePresence>
                    {filteredItems.map(item => (
                        <motion.div
                            layout
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.2 }}
                            key={item.id}
                        >
                            <Card className="overflow-hidden border-border bg-card shadow-sm hover:shadow-xl transition-all h-full flex flex-col group">
                                <div className="relative h-56 w-full overflow-hidden">
                                    <Image
                                        src={item.image}
                                        alt={item.name}
                                        fill
                                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                    <Badge className="absolute top-4 left-4 bg-background/80 backdrop-blur-sm text-foreground hover:bg-background/90 font-medium">
                                        {item.category}
                                    </Badge>
                                </div>

                                <div className="p-6 flex flex-col flex-grow">
                                    <div className="flex justify-between items-start mb-2">
                                        <h3 className="font-serif text-xl font-bold text-secondary">{item.name}</h3>
                                        <span className="font-bold text-primary whitespace-nowrap">{item.price} SAR</span>
                                    </div>
                                    <p className="text-muted-foreground text-sm flex-grow mb-6">{item.description}</p>

                                    <div className="flex items-center justify-between mt-auto">
                                        <ItemQuantitySelector onAdd={() => setCartCount(prev => prev + 1)} onRemove={() => setCartCount(prev => Math.max(0, prev - 1))} />
                                        <Button
                                            className="bg-secondary hover:bg-secondary/90 text-secondary-foreground"
                                            onClick={() => setCartCount(prev => prev + 1)}
                                        >
                                            Add
                                        </Button>
                                    </div>
                                </div>
                            </Card>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </motion.div>

            {filteredItems.length === 0 && (
                <div className="text-center py-20">
                    <p className="text-muted-foreground text-lg">No items found matching your search.</p>
                    <Button variant="link" className="text-primary mt-4" onClick={() => { setSearchQuery(""); setActiveCategory("all"); }}>
                        Clear Filters
                    </Button>
                </div>
            )}
        </div>
    );
}

function ItemQuantitySelector({ onAdd, onRemove }: { onAdd: () => void, onRemove: () => void }) {
    const [quantity, setQuantity] = useState(1);

    const handleMinus = () => {
        if (quantity > 1) {
            setQuantity(q => q - 1);
        }
    };

    const handlePlus = () => {
        setQuantity(q => q + 1);
    };

    return (
        <div className="flex items-center gap-3 bg-secondary/10 rounded-full p-1 border border-secondary/20">
            <button
                onClick={handleMinus}
                className="w-8 h-8 rounded-full flex items-center justify-center bg-background text-secondary hover:bg-secondary/20 transition-colors shadow-sm"
            >
                <Minus className="w-4 h-4" />
            </button>
            <span className="font-semibold text-sm w-4 text-center">{quantity}</span>
            <button
                onClick={handlePlus}
                className="w-8 h-8 rounded-full flex items-center justify-center bg-background text-secondary hover:bg-secondary/20 transition-colors shadow-sm"
            >
                <Plus className="w-4 h-4" />
            </button>
        </div>
    );
}
