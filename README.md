            Приложение Movies App
Использовано MovieDB API для разработки приложения по поиску фильмов.
- Используя API поиска фильмов получите фильмы по поиску по ключему слову "return" и выведите их на страницу
- Настройте все инструменты по контролю качества кода, как и в предыдущей проекте (eslint/prettier/husky/lint-staged). Для всех последующих проектов этот шаг требуется по-умолчанию.
- Для форматирования времени пользуйтесь date-fns
- Напишите отдельную функцию для сокращения текста описания, сокращенный текст не должен обрезать слова на середине.
- В качестве библиотекой компонентов используем Antd.
- Добавить индикатор загрузки - возьмите из библиотеки Antd компонент Spin.
- Реализуйте обработку ошибок - возьмите компонент Alert
- Добавить текстовое поле ввода, по изменению которого будет выполняться поиск
- Сделать серверную пагинацию с применением компонента Pagination
- При запуске приложения создаем новую гостевую сессию по апи
- Разделяем приложение на 2 таба - Search и Rated, в табе Rated выводим только список тех фильмов, которы оценивали без строки поиска - в остальном макет идетичен
- Добавляем звезды для голосования (компонент Rate). Если вы не голосовали за фильм - все звезды должны быть пустыми, если голосовали - тот рейтинг, что вы проставили фильму.
- Добавить блок с текущим рейтингом в правом-верхнем углу блока, сделать изменение цвета круга в зависимости от рейтинга
- При старте приложения получать список жанров, хранить данные с помощью React.Context, отображать по соотвествующим ID в списке жанров карточки.

  Развернутое приложение:
  https://movie-app-phi-azure.vercel.app/
