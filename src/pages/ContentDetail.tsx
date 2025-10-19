import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';

type ContentType = 'blog' | 'video' | 'podcast';

interface ContentItem {
  id: number;
  title: string;
  type: ContentType;
  description: string;
  date: string;
  views: string;
  content: string;
  readTime?: string;
  duration?: string;
}

interface Comment {
  id: number;
  author: string;
  text: string;
  date: string;
  likes: number;
}

const mockContent: ContentItem[] = [
  {
    id: 1,
    title: 'Как я создал свой первый подкаст',
    type: 'blog',
    description: 'Подробный гайд по запуску подкаста с нуля. Оборудование, софт, продвижение.',
    date: '15 окт 2024',
    views: '2.3K',
    readTime: '8 мин',
    content: `# Введение

Запуск подкаста — это увлекательное приключение, которое открывает новые возможности для общения с аудиторией. Я прошел этот путь и хочу поделиться своим опытом.

## Оборудование

Для начала вам не нужно дорогое оборудование. Я начинал с:

- **Микрофон USB** (Samson Q2U) — $60
- **Поп-фильтр** — $10
- **Наушники** (любые закрытые) — $30

### Важно!
Акустика помещения важнее дорогого микрофона. Запись в комнате с мягкой мебелью и коврами даст лучший результат, чем студийный микрофон в пустой комнате.

## Программное обеспечение

Я использую **Audacity** — бесплатный редактор аудио. Для монтажа хватает базовых функций:
- Обрезка тишины
- Нормализация громкости
- Удаление шума

## Продвижение

Самое сложное — это найти первых слушателей. Мои советы:

1. Публикуйте везде: Spotify, Apple Podcasts, YouTube
2. Делайте короткие клипы для соцсетей
3. Общайтесь с другими подкастерами
4. Будьте постоянны — выпускайте по графику

## Заключение

Не бойтесь начинать. Первые выпуски будут не идеальны, но с каждым разом вы будете лучше. Главное — начать!`
  },
  {
    id: 2,
    title: 'Топ-10 инструментов для контент-мейкера',
    type: 'video',
    description: 'Обзор лучших программ и сервисов для создания контента в 2024 году.',
    date: '12 окт 2024',
    views: '5.1K',
    duration: '15:23',
    content: `# Топ-10 инструментов 2024

В этом видео я покажу инструменты, которые использую ежедневно для создания контента.

## 1. CapCut — Видеоредактор

Бесплатный и мощный редактор для монтажа. Работает на компьютере и телефоне. Отличные шаблоны и AI-инструменты.

**Плюсы:**
- Бесплатный
- Простой интерфейс
- Много шаблонов

## 2. Canva — Дизайн

Для создания превью, постов, сторис. Огромная библиотека шаблонов.

## 3. Notion — Планирование

Планирование контента, скрипты, идеи — все в одном месте.

## 4. ChatGPT — AI-помощник

Помогает с идеями, скриптами, заголовками. Экономит часы работы.

## 5. ElevenLabs — Озвучка

AI-озвучка для видео. Качество почти как у настоящего диктора.

## 6. Epidemic Sound — Музыка

Библиотека музыки без авторских прав. Подписка окупается с первого видео.

## 7. TubeBuddy — YouTube SEO

Помогает с тегами, заголовками, анализом конкурентов.

## 8. Buffer — Планирование постов

Автопостинг в соцсети. Настроил раз — работает неделю.

## 9. Adobe Lightroom — Фото

Обработка фото для Instagram и превью.

## 10. Grammarly — Проверка текста

Проверка грамматики и стиля. Особенно важно для блогов.

---

Все эти инструменты доступны в бесплатных версиях или стоят недорого. Начните с них!`
  },
  {
    id: 3,
    title: 'EP.15: Монетизация блога',
    type: 'podcast',
    description: 'Разбираем все способы монетизации: от рекламы до собственных продуктов.',
    date: '10 окт 2024',
    views: '1.8K',
    duration: '42:18',
    content: `# Эпизод 15: Монетизация блога

В этом выпуске разбираем все способы заработка на контенте.

## Основные способы монетизации

### 1. Реклама (00:02:30)
- Прямая реклама от брендов
- Рекламные сети (Google AdSense)
- Интеграции в контент

**Плюсы:** Пассивный доход  
**Минусы:** Нужна большая аудитория

### 2. Партнерские программы (00:12:45)
- Ссылки на товары (Amazon Associates)
- Реферальные программы
- Промокоды с комиссией

**Совет:** Рекомендуйте только то, чем сами пользуетесь.

### 3. Собственные продукты (00:24:10)
- Онлайн-курсы
- E-books
- Консультации
- Мерч

**Плюсы:** Высокая маржа  
**Минусы:** Нужно время на создание

### 4. Донаты и подписки (00:35:20)
- Patreon
- Boosty
- YouTube Membership

**Для кого:** Лояльная аудитория, эксклюзивный контент

## Мой опыт

Первый год: только реклама — $200/месяц  
Второй год: +партнерки — $800/месяц  
Третий год: +курс — $3000/месяц

## Главный совет

Не гонитесь за деньгами с первых дней. Сначала создайте ценность для аудитории, монетизация придет следом.

---

**Ссылки из выпуска:**
- Мой курс "Запуск блога" — ссылка в описании
- Калькулятор монетизации — в Telegram-боте`
  },
  {
    id: 4,
    title: 'Мой путь в блогинге: от 0 до 100K',
    type: 'blog',
    description: 'История роста канала, ошибки и находки на пути к успеху.',
    date: '8 окт 2024',
    views: '4.2K',
    readTime: '12 мин',
    content: `# От нуля до 100K подписчиков

Три года назад я загрузил первое видео. Сегодня у меня 100K подписчиков. Вот как это было.

## Начало (0-1000 подписчиков)

Первые 6 месяцев — самые сложные. Я снимал видео, которые никто не смотрел.

**Ошибки:**
- Снимал "для всех" — не было целевой аудитории
- Нерегулярные выпуски
- Плохое качество звука

**Что помогло:**
- Нашел свою нишу (обзоры техники для новичков)
- Начал выходить по средам в 18:00
- Купил нормальный микрофон

## Рост (1K-10K подписчиков)

Первая 1000 далась за 6 месяцев. Следующие 9000 — за 4 месяца.

**Прорыв:**
Одно видео набрало 500K просмотров. Секрет — попал в тренд и сделал видео быстрее конкурентов.

**Что изменилось:**
- Начал анализировать аналитику
- Сотрудничал с другими блогерами
- Улучшил превью и заголовки

## Развитие (10K-50K)

Появился стабильный доход от рекламы. Начал относиться к блогу как к бизнесу.

**Инвестиции:**
- Камера Sony A6400 — $900
- Свет и фон — $300
- Редактор на аутсорс — $500/месяц

## Масштаб (50K-100K)

Последний рывок был самым быстрым благодаря:
- Запуску подкаста
- Активности в Instagram Reels
- Коллаборациям с топовыми блогерами

## Главные уроки

1. **Постоянство важнее качества** — лучше выпускать регулярно, чем ждать идеала
2. **Ниша решает** — лучше быть первым в узкой нише, чем десятым в широкой
3. **Анализируйте данные** — YouTube Analytics — ваш лучший учитель
4. **Развивайтесь** — то, что работало год назад, сегодня не работает

## Что дальше?

Цель — 500K к концу года. План:
- Запуск курса для начинающих блогеров
- Расширение команды
- Новый формат — короткие видео-уроки

Спасибо, что были со мной на этом пути! 🚀`
  },
  {
    id: 5,
    title: 'Съемка видео на телефон: гайд 2024',
    type: 'video',
    description: 'Как снимать качественный контент без дорогой камеры.',
    date: '5 окт 2024',
    views: '3.7K',
    duration: '18:45',
    content: `# Съемка на телефон: полный гайд

Современные телефоны снимают не хуже камер за $1000. Главное — знать как.

## Подготовка

### Очистите объектив!
Звучит банально, но 80% плохих видео — из-за грязного объектива.

### Настройки камеры
- **Разрешение:** 4K 30fps (для YouTube) или 1080p 60fps (для соцсетей)
- **Стабилизация:** включить
- **HDR:** выключить для видео
- **Сетка:** включить (правило третей)

## Свет — главное!

**Золотые правила:**
1. Снимайте лицом к источнику света
2. Избегайте верхнего света (некрасивые тени)
3. Лучшее время — "золотой час" (час после рассвета/до заката)

**Бюджетное решение:**
Кольцевая лампа с AliExpress — $15

## Звук

Встроенный микрофон телефона — самое слабое место.

**Решения:**
- Петличка ($20) — для камеры в руках
- Беспроводная петличка ($40) — для съемки издалека
- Направленный микрофон ($60) — для влогов

## Стабилизация

**Варианты:**
1. Штатив-тренога ($10) — для статики
2. Gimbal ($100) — для движения
3. Просто упритесь локтями в тело — бесплатно, но работает!

## Композиция

### Правило третей
Размещайте объект не в центре, а на пересечении линий сетки.

### Ракурсы
- Не снимайте снизу вверх — делает лицо шире
- Чуть сверху — универсальный ракурс
- Экспериментируйте с углами

## Монтаж на телефоне

**CapCut** — лучший бесплатный редактор для телефона.

**Базовый workflow:**
1. Обрежьте лишнее
2. Добавьте музыку
3. Цветокоррекция (preset "Vibrant")
4. Субтитры (автогенерация в CapCut)

## Частые ошибки

❌ Вертикальное видео для YouTube — снимайте горизонтально!  
❌ Съемка против света  
❌ Слишком быстрые движения камеры  
❌ Игнорирование звука  

## Заключение

Телефон — это полноценная студия в кармане. Не оборудование делает видео крутым, а умение им пользоваться.

**Мой телефон:** iPhone 13 Pro (но 90% советов работают на любом телефоне с 2020 года)

Снимайте, экспериментируйте, развивайтесь! 📱🎬`
  },
  {
    id: 6,
    title: 'EP.14: Гость - SMM-менеджер',
    type: 'podcast',
    description: 'Интервью с профессионалом: как работает продвижение в соцсетях.',
    date: '3 окт 2024',
    views: '2.1K',
    duration: '51:32',
    content: `# Эпизод 14: Интервью с SMM-менеджером

Гость — Анна Иванова, SMM-менеджер с опытом 5+ лет. Ведет аккаунты брендов и личные блоги.

## О госте (00:00:45)

**Анна:** Привет! Я начинала как SMM-щик в небольшом агентстве, сейчас веду 15+ проектов и обучаю новичков.

## Как начать в SMM? (00:05:20)

**Вопрос:** Что нужно знать новичку?

**Анна:** Начните с малого:
1. Создайте свой блог (любая тема)
2. Публикуйте 2-3 раза в неделю
3. Анализируйте статистику
4. Изучайте успешные примеры

**Главное** — понять механику: как работают алгоритмы, что цепляет людей, почему один пост взлетает, а другой нет.

## Ошибки начинающих (00:15:40)

**Анна:**
- Покупка подписчиков — алгоритмы видят и наказывают
- Нерегулярность — аудитория забывает о вас
- Игнорирование аналитики — работа вслепую
- Копирование чужого контента — нет своего голоса

## Тренды 2024 (00:28:15)

**Что работает сейчас:**

### 1. Короткие видео
Reels, Shorts, TikTok — главные драйверы роста. Алгоритмы продвигают видео сильнее статичных постов.

### 2. UGC-контент
User Generated Content — "сырой" контент от обычных людей. Работает лучше студийных фото.

### 3. Личный бренд
Даже продавая товары, показывайте лицо. Люди покупают у людей, не у брендов.

### 4. AI-инструменты
ChatGPT для текстов, Midjourney для картинок, CapCut для монтажа. Умение работать с AI — новый must-have.

## Монетизация SMM (00:38:50)

**Вопрос:** Сколько можно зарабатывать?

**Анна:**
- Новичок (фриланс) — $200-500/мес
- Опытный специалист — $1000-3000/мес
- Агентство/команда — $5000+/мес

**Главный совет:** Начните с небольших проектов, собирайте кейсы, повышайте цены постепенно.

## Инструменты (00:45:30)

**Must-have:**
- Canva — дизайн
- Later/Buffer — планирование постов
- Metricool — аналитика
- ChatGPT — идеи и тексты

## Заключение (00:50:00)

**Анна:** SMM — это не только креатив, но и аналитика, психология, маркетинг. Если нравится общаться, анализировать и создавать — вам сюда!

---

**Где найти Анну:**
- Instagram: @anna_smm
- Telegram-канал: @smm_secrets
- Курс "SMM с нуля" — ссылка в описании`
  }
];

const mockComments: Comment[] = [
  {
    id: 1,
    author: 'Алексей К.',
    text: 'Отличный материал! Сразу видно опыт. Взял на заметку несколько советов.',
    date: '16 окт 2024',
    likes: 24
  },
  {
    id: 2,
    author: 'Мария С.',
    text: 'Спасибо за подробный разбор! Как раз думала начать свой подкаст, теперь знаю с чего начать.',
    date: '16 окт 2024',
    likes: 12
  },
  {
    id: 3,
    author: 'Дмитрий В.',
    text: 'А можно подробнее про монтаж? Какие плагины используешь для удаления шума?',
    date: '15 окт 2024',
    likes: 8
  }
];

const ContentDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [newComment, setNewComment] = useState('');
  const [comments, setComments] = useState(mockComments);
  const [commentLikes, setCommentLikes] = useState<{[key: number]: number}>({});

  const content = mockContent.find(item => item.id === Number(id));

  if (!content) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Icon name="FileQuestion" size={64} className="mx-auto mb-4 text-muted-foreground" />
          <h2 className="text-2xl font-heading font-bold mb-2">Материал не найден</h2>
          <Button onClick={() => navigate('/')} className="mt-4">
            Вернуться на главную
          </Button>
        </div>
      </div>
    );
  }

  const handleAddComment = () => {
    if (newComment.trim()) {
      const comment: Comment = {
        id: comments.length + 1,
        author: 'Вы',
        text: newComment,
        date: 'Только что',
        likes: 0
      };
      setComments([comment, ...comments]);
      setNewComment('');
    }
  };

  const handleLikeComment = (commentId: number) => {
    setCommentLikes(prev => ({
      ...prev,
      [commentId]: (prev[commentId] || 0) + 1
    }));
  };

  const getTypeIcon = (type: ContentType) => {
    switch(type) {
      case 'blog': return 'FileText';
      case 'video': return 'Video';
      case 'podcast': return 'Mic';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border sticky top-0 bg-background/95 backdrop-blur z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => navigate('/')}>
              <Icon name="ArrowLeft" size={20} />
            </Button>
            <h1 className="text-2xl font-heading font-bold text-primary">СпермаБак</h1>
          </div>
        </div>
      </header>

      <article className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="mb-8 animate-fade-in">
          <div className="flex items-center gap-3 mb-4">
            <Badge className="text-sm">
              <Icon name={getTypeIcon(content.type)} size={14} className="mr-1" />
              {content.type === 'blog' ? 'Блог' : content.type === 'video' ? 'Видео' : 'Подкаст'}
            </Badge>
            <span className="text-sm text-muted-foreground flex items-center gap-1">
              <Icon name="Calendar" size={14} />
              {content.date}
            </span>
            {content.readTime && (
              <span className="text-sm text-muted-foreground flex items-center gap-1">
                <Icon name="Clock" size={14} />
                {content.readTime}
              </span>
            )}
            {content.duration && (
              <span className="text-sm text-muted-foreground flex items-center gap-1">
                <Icon name="Clock" size={14} />
                {content.duration}
              </span>
            )}
            <span className="text-sm text-muted-foreground flex items-center gap-1 ml-auto">
              <Icon name="Eye" size={14} />
              {content.views}
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4 bg-gradient-to-r from-primary to-purple-400 bg-clip-text text-transparent">
            {content.title}
          </h1>

          <p className="text-xl text-muted-foreground mb-8">
            {content.description}
          </p>

          {content.type === 'video' && (
            <div className="aspect-video bg-muted rounded-lg mb-8 flex items-center justify-center animate-scale-in">
              <Icon name="Play" size={64} className="text-primary" />
            </div>
          )}

          {content.type === 'podcast' && (
            <Card className="mb-8 bg-card/50 animate-scale-in">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <Button size="lg" className="rounded-full">
                    <Icon name="Play" size={24} />
                  </Button>
                  <div className="flex-1">
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-primary w-1/3 rounded-full"></div>
                    </div>
                    <div className="flex justify-between text-xs text-muted-foreground mt-2">
                      <span>14:23</span>
                      <span>{content.duration}</span>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon">
                    <Icon name="Volume2" size={20} />
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          <div className="prose prose-invert max-w-none prose-headings:font-heading prose-headings:text-foreground prose-p:text-foreground prose-strong:text-foreground prose-li:text-foreground">
            {content.content.split('\n').map((line, index) => {
              if (line.startsWith('# ')) {
                return <h1 key={index} className="text-3xl font-bold mt-8 mb-4">{line.slice(2)}</h1>;
              } else if (line.startsWith('## ')) {
                return <h2 key={index} className="text-2xl font-semibold mt-6 mb-3">{line.slice(3)}</h2>;
              } else if (line.startsWith('### ')) {
                return <h3 key={index} className="text-xl font-semibold mt-4 mb-2">{line.slice(4)}</h3>;
              } else if (line.startsWith('- ')) {
                return <li key={index} className="ml-4">{line.slice(2)}</li>;
              } else if (line.startsWith('**') && line.endsWith('**')) {
                return <p key={index} className="font-bold my-2">{line.slice(2, -2)}</p>;
              } else if (line.startsWith('---')) {
                return <hr key={index} className="my-8 border-border" />;
              } else if (line.trim() === '') {
                return <br key={index} />;
              } else {
                return <p key={index} className="my-3">{line}</p>;
              }
            })}
          </div>
        </div>

        <div className="border-t border-border pt-8 mt-12">
          <div className="flex items-center gap-4 mb-8">
            <h2 className="text-2xl font-heading font-bold">
              Комментарии ({comments.length})
            </h2>
          </div>

          <Card className="mb-6 bg-card/50">
            <CardContent className="p-4">
              <Textarea
                placeholder="Поделитесь своим мнением..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className="mb-3 min-h-[100px] bg-background"
              />
              <div className="flex justify-end">
                <Button onClick={handleAddComment} disabled={!newComment.trim()}>
                  <Icon name="Send" size={16} className="mr-2" />
                  Отправить
                </Button>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-4">
            {comments.map((comment) => (
              <Card key={comment.id} className="bg-card/50 animate-fade-in">
                <CardContent className="p-4">
                  <div className="flex gap-4">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className="bg-primary text-primary-foreground">
                        {comment.author.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="font-semibold">{comment.author}</span>
                        <span className="text-xs text-muted-foreground">{comment.date}</span>
                      </div>
                      <p className="text-foreground mb-3">{comment.text}</p>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="gap-2 h-8"
                        onClick={() => handleLikeComment(comment.id)}
                      >
                        <Icon name="ThumbsUp" size={14} />
                        {comment.likes + (commentLikes[comment.id] || 0)}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </article>

      <footer className="border-t border-border py-8 px-4 mt-12">
        <div className="container mx-auto text-center text-muted-foreground">
          <p>&copy; 2024 СпермаБак. Все права защищены.</p>
        </div>
      </footer>
    </div>
  );
};

export default ContentDetail;
