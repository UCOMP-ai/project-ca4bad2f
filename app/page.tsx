import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Sparkles,
    Layout,
    Code,
    Layers,
    Cloud,
    Server,
    ArrowRight
} from "lucide-react";

export default function HomePage() {
    const features = [
        {
            title: "브랜드 디자인 생성",
            description: "AI를 활용하여 브랜드 가치를 시각화한 디자인을 생성합니다",
            icon: Sparkles,
            href: "/brand-design",
            gradient: "from-primary to-secondary",
        },
        {
            title: "와이어프레임 생성",
            description: "Figma JSON 형식의 와이어프레임을 AI로 자동 생성합니다",
            icon: Layout,
            href: "/wireframe",
            gradient: "from-secondary to-accent",
        },
        {
            title: "HTML 코드 생성",
            description: "와이어프레임을 시맨틱 HTML/CSS로 변환합니다",
            icon: Code,
            href: "/html-generator",
            gradient: "from-accent to-primary",
        },
        {
            title: "React 변환",
            description: "HTML을 Next.js React 컴포넌트로 변환합니다",
            icon: Layers,
            href: "/react-converter",
            gradient: "from-primary via-accent to-secondary",
        },
        {
            title: "Vercel 배포",
            description: "React 앱을 Vercel에 자동 배포합니다",
            icon: Cloud,
            href: "/deploy-vercel",
            gradient: "from-secondary to-primary",
        },
        {
            title: "AWS 백엔드 배포",
            description: "백엔드 서비스를 AWS에 배포합니다",
            icon: Server,
            href: "/deploy-aws",
            gradient: "from-accent to-secondary",
        },
    ];

    return (
        <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
            {/* Header */}
            <header className="border-b border-border bg-background/80 backdrop-blur-md sticky top-0 z-50">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        <h1 className="text-2xl font-bold text-foreground">
                            AI-Powered CMS
                        </h1>
                        <div className="flex gap-4">
                            <Button variant="ghost" className="text-muted-foreground hover:text-foreground">
                                문서
                            </Button>
                            <Button variant="default">
                                시작하기
                            </Button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Hero Section */}
            <section className="container mx-auto px-4 py-20 text-center">
                <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
                    <h2 className="text-4xl md:text-6xl font-bold text-foreground leading-tight">
                        브랜드에서 배포까지
                        <br />
                        <span className="text-primary">AI로 자동화</span>
                    </h2>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                        브랜드 아이디어를 입력하면 AI가 디자인, 코딩, 배포까지 모든 과정을 자동으로 처리합니다
                    </p>
                    <div className="flex gap-4 justify-center pt-4">
                        <Button size="lg" variant="default" asChild>
                            <Link href="/brand-design">
                                시작하기 <ArrowRight className="ml-2" />
                            </Link>
                        </Button>
                        <Button size="lg" variant="outline">
                            데모 보기
                        </Button>
                    </div>
                </div>
            </section>

            {/* Features Grid */}
            <section className="container mx-auto px-4 py-20">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {features.map((feature, index) => {
                        const Icon = feature.icon;
                        return (
                            <Link key={index} href={feature.href}>
                                <Card className="h-full bg-card border-border hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer group">
                                    <CardHeader>
                                        <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform opacity-90`}>
                                            <Icon className="w-6 h-6 text-white" />
                                        </div>
                                        <CardTitle className="text-card-foreground">{feature.title}</CardTitle>
                                        <CardDescription className="text-muted-foreground">
                                            {feature.description}
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="flex items-center text-primary group-hover:text-primary/80 transition-colors">
                                            <span className="text-sm font-medium">시작하기</span>
                                            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                                        </div>
                                    </CardContent>
                                </Card>
                            </Link>
                        );
                    })}
                </div>
            </section>

            {/* Footer */}
            <footer className="border-t border-border mt-20 bg-muted/30">
                <div className="container mx-auto px-4 py-8">
                    <p className="text-center text-muted-foreground">
                        © 2026 AI-Powered CMS. All rights reserved.
                    </p>
                </div>
            </footer>
        </div>
    );
}
