
import React, { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Users, Briefcase, UserX, UserCheck, GraduationCap } from 'lucide-react';
import { EmployeeData } from '@/types/employee';

interface KPICardsProps {
  data: EmployeeData[];
}

export const KPICards = ({ data }: KPICardsProps) => {
  const [animatedValues, setAnimatedValues] = useState({
    total: 0,
    billable: 0,
    benched: 0,
    shadow: 0,
    interns: 0,
  });

  const kpis = {
    total: data.length,
    billable: data.filter(emp => emp.status === 'Billable').length,
    benched: data.filter(emp => emp.status === 'Benched').length,
    shadow: data.filter(emp => emp.status === 'Shadow').length,
    interns: data.filter(emp => emp.status === 'Intern').length,
  };

  useEffect(() => {
    const duration = 1000;
    const steps = 60;
    const stepTime = duration / steps;

    Object.keys(kpis).forEach((key) => {
      const targetValue = kpis[key as keyof typeof kpis];
      let currentStep = 0;

      const timer = setInterval(() => {
        currentStep++;
        const progress = currentStep / steps;
        const easedProgress = 1 - Math.pow(1 - progress, 3); // Ease out cubic
        const currentValue = Math.round(targetValue * easedProgress);

        setAnimatedValues(prev => ({
          ...prev,
          [key]: currentValue
        }));

        if (currentStep >= steps) {
          clearInterval(timer);
        }
      }, stepTime);
    });
  }, [data]);

  const cards = [
    {
      title: 'Total Employees',
      value: animatedValues.total,
      target: kpis.total,
      icon: Users,
      trend: '+5.2%',
      trendPositive: true,
      color: 'from-blue-500 to-blue-600',
      bgColor: 'from-blue-50 to-blue-100',
    },
    {
      title: 'Billable',
      value: animatedValues.billable,
      target: kpis.billable,
      icon: Briefcase,
      trend: '+8.1%',
      trendPositive: true,
      color: 'from-green-500 to-green-600',
      bgColor: 'from-green-50 to-green-100',
    },
    {
      title: 'Benched',
      value: animatedValues.benched,
      target: kpis.benched,
      icon: UserX,
      trend: '-3.4%',
      trendPositive: false,
      color: 'from-orange-500 to-orange-600',
      bgColor: 'from-orange-50 to-orange-100',
    },
    {
      title: 'Shadow',
      value: animatedValues.shadow,
      target: kpis.shadow,
      icon: UserCheck,
      trend: '+12.3%',
      trendPositive: true,
      color: 'from-purple-500 to-purple-600',
      bgColor: 'from-purple-50 to-purple-100',
    },
    {
      title: 'Interns',
      value: animatedValues.interns,
      target: kpis.interns,
      icon: GraduationCap,
      trend: '+25.7%',
      trendPositive: true,
      color: 'from-pink-500 to-pink-600',
      bgColor: 'from-pink-50 to-pink-100',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
      {cards.map((card, index) => (
        <Card 
          key={card.title}
          className="backdrop-blur-lg bg-white/40 border-white/20 hover:bg-white/50 transition-all duration-300 hover:scale-105 hover:shadow-xl animate-fade-in"
          style={{ animationDelay: `${index * 100}ms` }}
        >
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className={`p-3 rounded-xl bg-gradient-to-br ${card.bgColor}`}>
                <card.icon className={`h-6 w-6 bg-gradient-to-r ${card.color} bg-clip-text text-transparent`} />
              </div>
              <div className={`text-sm font-medium ${card.trendPositive ? 'text-green-600' : 'text-red-600'}`}>
                {card.trend}
              </div>
            </div>
            
            <div className="mt-4">
              <div className="text-2xl font-bold text-gray-900">
                {card.value.toLocaleString()}
              </div>
              <div className="text-sm text-muted-foreground mt-1">
                {card.title}
              </div>
            </div>
            
            <div className="mt-3 bg-gray-200 rounded-full h-2">
              <div 
                className={`h-2 rounded-full bg-gradient-to-r ${card.color} transition-all duration-1000`}
                style={{ width: `${(card.value / card.target) * 100}%` }}
              />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
