import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

type ContentType = 'all' | 'blog' | 'video' | 'podcast';

interface ContentItem {
  id: number;
  title: string;
  type: ContentType;
  description: string;
  date: string;
  views: string;
}

const mockContent: ContentItem[] = [
  {
    id: 1,
    title: 'Как я создал свой первый подкаст',
    type: 'blog',
    description: 'Подробный гайд по запуску подкаста с нуля. Оборудование, софт, продвижение.',
    date: '15 окт 2024',
    views: '2.3K'
  },
  {
    id: 2,
    title: 'Топ-10 инструментов для контент-мейкера',
    type: 'video',
    description: 'Обзор лучших программ и сервисов для создания контента в 2024 году.',
    date: '12 окт 2024',
    views: '5.1K'
  },
  {
    id: 3,
    title: 'EP.15: Монетизация блога',
    type: 'podcast',
    description: 'Разбираем все способы монетизации: от рекламы до собственных продуктов.',
    date: '10 окт 2024',
    views: '1.8K'
  },
  {
    id: 4,
    title: 'Мой путь в блогинге: от 0 до 100K',
    type: 'blog',
    description: 'История роста канала, ошибки и находки на пути к успеху.',
    date: '8 окт 2024',
    views: '4.2K'
  },
  {
    id: 5,
    title: 'Съемка видео на телефон: гайд 2024',
    type: 'video',
    description: 'Как снимать качественный контент без дорогой камеры.',
    date: '5 окт 2024',
    views: '3.7K'
  },
  {
    id: 6,
    title: 'EP.14: Гость - SMM-менеджер',
    type: 'podcast',
    description: 'Интервью с профессионалом: как работает продвижение в соцсетях.',
    date: '3 окт 2024',
    views: '2.1K'
  }
];

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<ContentType>('all');

  const filteredContent = mockContent.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = activeFilter === 'all' || item.type === activeFilter;
    return matchesSearch && matchesFilter;
  });

  const getTypeIcon = (type: ContentType) => {
    switch(type) {
      case 'blog': return 'FileText';
      case 'video': return 'Video';
      case 'podcast': return 'Mic';
      default: return 'Circle';
    }
  };

  const getTypeBadgeVariant = (type: ContentType) => {
    switch(type) {
      case 'blog': return 'secondary';
      case 'video': return 'default';
      case 'podcast': return 'outline';
      default: return 'secondary';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border sticky top-0 bg-background/95 backdrop-blur z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-heading font-bold text-primary">СпермаБак</h1>
            <nav className="hidden md:flex gap-6">
              <a href="#" className="text-foreground hover:text-primary transition-colors">Главная</a>
              <a href="#blog" className="text-foreground hover:text-primary transition-colors">Блог</a>
              <a href="#about" className="text-foreground hover:text-primary transition-colors">О блогере</a>
              <a href="#video" className="text-foreground hover:text-primary transition-colors">Видео</a>
              <a href="#podcasts" className="text-foreground hover:text-primary transition-colors">Подкасты</a>
            </nav>
          </div>
        </div>
      </header>

      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl text-center animate-fade-in">
          <h2 className="text-5xl md:text-7xl font-heading font-bold mb-6 bg-gradient-to-r from-primary to-purple-400 bg-clip-text text-transparent">
            Контент, который вдохновляет
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Блог, видео и подкасты о создании контента, монетизации и личном развитии
          </p>
        </div>
      </section>

      <section className="py-8 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="mb-8 space-y-4">
            <div className="relative">
              <Icon name="Search" className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
              <Input
                type="text"
                placeholder="Поиск по контенту..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 py-6 text-lg bg-card border-border"
              />
            </div>

            <div className="flex gap-3 flex-wrap">
              <Badge
                variant={activeFilter === 'all' ? 'default' : 'outline'}
                className="cursor-pointer px-4 py-2 text-sm transition-all hover:scale-105"
                onClick={() => setActiveFilter('all')}
              >
                Все
              </Badge>
              <Badge
                variant={activeFilter === 'blog' ? 'default' : 'outline'}
                className="cursor-pointer px-4 py-2 text-sm transition-all hover:scale-105"
                onClick={() => setActiveFilter('blog')}
              >
                <Icon name="FileText" size={14} className="mr-1" />
                Блог
              </Badge>
              <Badge
                variant={activeFilter === 'video' ? 'default' : 'outline'}
                className="cursor-pointer px-4 py-2 text-sm transition-all hover:scale-105"
                onClick={() => setActiveFilter('video')}
              >
                <Icon name="Video" size={14} className="mr-1" />
                Видео
              </Badge>
              <Badge
                variant={activeFilter === 'podcast' ? 'default' : 'outline'}
                className="cursor-pointer px-4 py-2 text-sm transition-all hover:scale-105"
                onClick={() => setActiveFilter('podcast')}
              >
                <Icon name="Mic" size={14} className="mr-1" />
                Подкасты
              </Badge>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredContent.map((item, index) => (
              <Card 
                key={item.id} 
                className="group hover:border-primary transition-all duration-300 cursor-pointer bg-card hover:shadow-lg hover:shadow-primary/10 animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <Badge variant={getTypeBadgeVariant(item.type)} className="text-xs">
                      <Icon name={getTypeIcon(item.type)} size={12} className="mr-1" />
                      {item.type === 'blog' ? 'Блог' : item.type === 'video' ? 'Видео' : 'Подкаст'}
                    </Badge>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Icon name="Eye" size={14} />
                      {item.views}
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-heading font-semibold mb-2 group-hover:text-primary transition-colors">
                    {item.title}
                  </h3>
                  
                  <p className="text-sm text-muted-foreground mb-4">
                    {item.description}
                  </p>
                  
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Icon name="Calendar" size={14} />
                      {item.date}
                    </span>
                    <Icon name="ArrowRight" size={16} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredContent.length === 0 && (
            <div className="text-center py-20 animate-fade-in">
              <Icon name="SearchX" size={48} className="mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-xl font-heading font-semibold mb-2">Ничего не найдено</h3>
              <p className="text-muted-foreground">Попробуйте изменить поисковый запрос или фильтры</p>
            </div>
          )}
        </div>
      </section>

      <section id="about" className="py-20 px-4 bg-card/50">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-4xl font-heading font-bold mb-6">О блогере</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Привет! Я создаю контент о блогинге, монетизации и личном развитии. 
            За несколько лет прошел путь от первого видео до 100K+ аудитории. 
            Делюсь опытом, ошибками и находками в блоге, видео и подкастах.
          </p>
          <div className="flex justify-center gap-4">
            <a href="#" className="inline-flex items-center gap-2 text-foreground hover:text-primary transition-colors">
              <Icon name="Youtube" size={20} />
              YouTube
            </a>
            <a href="#" className="inline-flex items-center gap-2 text-foreground hover:text-primary transition-colors">
              <Icon name="Instagram" size={20} />
              Instagram
            </a>
            <a href="#" className="inline-flex items-center gap-2 text-foreground hover:text-primary transition-colors">
              <Icon name="Twitter" size={20} />
              Twitter
            </a>
          </div>
        </div>
      </section>

      <footer className="border-t border-border py-8 px-4">
        <div className="container mx-auto text-center text-muted-foreground">
          <p>&copy; 2024 СпермаБак. Все права защищены.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
