"use client";

import { useTranslations } from "next-intl";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { cn } from "@/lib/utils";

interface AuthCardProps {
  children: React.ReactNode;
  titleKey: string;
  descriptionKey?: string;
  className?: string;
}

export function AuthCard({ children, titleKey, descriptionKey, className }: AuthCardProps) {
  const t = useTranslations();

  const title = titleKey.includes(".") ? t(titleKey) : titleKey;
  const description = descriptionKey ? (descriptionKey.includes(".") ? t(descriptionKey) : descriptionKey) : undefined;

  return (
    <Card className={cn("w-full max-w-md", className)}>
      <CardHeader className="space-y-1">
        <CardTitle className="text-xl">{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}
