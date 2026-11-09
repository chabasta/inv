export const ACTIVITIES = [
 {id:'pumpkin',emoji:'🎃',title:'Тыквенный беспредел',text:'Совместное вырезание всякой фигни из тыкв. Хэллоуин прошёл, но кто нам запретит?'},
 {id:'art',emoji:'🎨',title:'Художественная мастерская',text:'Раскрашивание раскрасок фломастерами с возможностью раскрыть свой художественный талант (или его отсутствие).'},
 {id:'philosophy',emoji:'🌿',title:'Философский вечер',text:'Расслабиться и обсудить крайне важные вопросы мироздания.'},
 {id:'wine',emoji:'🍷',title:'Винный вечер',text:'Культурное распитие вина с постепенной потерей культурности.'},
 {id:'movie',emoji:'🎬',title:'Кинозал на диване',text:'Посмотреть фильм, аниме или что-нибудь интересное.'},
 {id:'culture',emoji:'🎭',title:'Культурный выход в свет',text:'Сходить в театр или кино, чтобы почувствовать себя интеллигентными людьми.'},
 {id:'sushi',emoji:'🍣',title:'Суши-операция',text:'Совместное уничтожение суши в особо крупных размерах.'},
] as const
export const ANIME = ['Табакошка','Нежеланно бессмертный авантюрист','Перерождение: Монстр','На Ваше усмотрение'] as const
export const MOODS = [
 {id:'cuddle',emoji:'🥰',title:'Хочу милоты и обнимашек'},{id:'adventure',emoji:'😈',title:'Хочу приключений'},
 {id:'lazy',emoji:'🦥',title:'Хочу лежать и ничего не делать'},{id:'relax',emoji:'🍷',title:'Хочу расслабиться'},
 {id:'chaos',emoji:'🤪',title:'Хочу творить какую-то дичь'},{id:'surprise',emoji:'🎲',title:'Удиви меня'},
] as const
export const EASTER = ['Компания не несёт ответственности за чрезмерное количество улыбок','Уровень балбесничества: премиальный','Все услуги предоставляются с искренним энтузиазмом','Генеральный директор лично контролирует качество обслуживания']
const b = import.meta.env.BASE_URL
const img = (n: string) => `${b}images/${n}.jpg`
export const BG = img('bg')
export const CARD_IMG: Partial<Record<string, string>> = { pumpkin: img('pumpkin'), art: img('art'), wine: img('wine'), movie: img('movie'), culture: img('culture'), sushi: img('sushi'), philosophy: `${b}images/philosophy.png` }
