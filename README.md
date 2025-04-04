# Установка необходимого ПО

## Node.js

Для установки Node.js на Windows есть несколько способов:

### 1. Через официальный установщик (рекомендуемый способ)

1. Откройте браузер (Chrome, Firefox или другой)
2. Перейдите по ссылке: https://nodejs.org/en/download
3. В выпадающем списке версий Get Node.js® необходимо выбрать v20.19.0, нажать на зеленую кнопку Windows installer
4. После скачивания найдите файл в папке "Загрузки" (Downloads)
5. Дважды кликните по скачанному файлу (node-v20.19.0-x64.msi)
6. В открывшемся окне нажмите "Next"
7. Примите условия лицензии и нажмите "Next"
8. Оставьте все настройки по умолчанию и нажимайте "Next"
9. В конце нажмите "Install"
10. После установки нажмите "Finish"

Чтобы проверить, что установка прошла успешно:
1. Нажмите Win + R на клавиатуре
2. Введите "powershell" и нажмите Enter
3. В открывшемся окне введите команды:
```powershell
node --version
npm --version
```
Если вы видите номера версий (например, v20.19.0 и 10.2.4), значит установка прошла успешно.

### Установка NVM (Node Version Manager)

Если вам нужно управлять несколькими версиями Node.js:

1. Откройте браузер
2. Перейдите по ссылке: https://github.com/coreybutler/nvm-windows/releases
3. Скачайте файл "nvm-setup.exe"
4. Запустите скачанный файл
5. Следуйте инструкциям установщика

После установки откройте новое окно PowerShell и выполните:
```powershell
nvm install 20.19.0  # установка конкретной версии
nvm use 20.19.0      # использование конкретной версии
```

## Git

### Через официальный установщик

1. Откройте браузер
2. Перейдите по ссылке: https://git-scm.com/download/win
3. Скачайте установщик для Windows (64-bit)
4. Запустите скачанный файл
5. В окне установщика нажимайте "Next", оставляя настройки по умолчанию
6. В конце нажмите "Install"

После установки Git нужно настроить ваше имя и email:
1. Откройте PowerShell (Win + R, введите "powershell", нажмите Enter)
2. Введите команды (замените "Ваше имя" и "ваш.email@example.com" на ваши данные):
```powershell
git config --global user.name "Ваше имя"
git config --global user.email "ваш.email@example.com"
```

## Клонирование проекта

1. Откройте PowerShell
2. Перейдите в папку, где хотите разместить проект. Например, на рабочий стол:
```powershell
cd C:\Users\Ваше_имя\Desktop
```
3. Склонируйте репозиторий:
```powershell
git clone https://github.com/MortDer/ollama-test.git
```
4. Перейдите в папку проекта:
```powershell
cd ollama-test
```

## Установка зависимостей проекта

1. Убедитесь, что вы находитесь в папке проекта (в PowerShell должен быть путь, заканчивающийся на "ollama-test")
2. Установите зависимости:
```powershell
npm install
```
3. После успешной установки запустите проект:
```powershell
vite
```

После запуска в браузере автоматически откроется страница с проектом. Если этого не произошло, откройте браузер и перейдите по адресу: http://localhost:5173

## Установка Ollama

1. Откройте браузер
2. Перейдите по ссылке: https://ollama.ai/download
3. Скачайте установщик для Windows
4. Запустите скачанный файл
5. Следуйте инструкциям установщика

После установки Ollama нужно загрузить необходимые модели. Откройте PowerShell и выполните команду по скачиванию модели:

```powershell
# Загрузка модели
ollama pull <имя модели>

```

Список моделей: https://ollama.com/search

Чтобы проверить, что Ollama установлен и работает корректно:
1. Откройте PowerShell
2. Введите команду:
```powershell
ollama --version
```
Если вы видите номер версии, значит установка прошла успешно.

## Возможные проблемы

Если при выполнении команд появляются ошибки:
1. Убедитесь, что все программы (Node.js, Git) установлены правильно
2. Попробуйте закрыть и снова открыть PowerShell
3. Проверьте, что вы находитесь в правильной папке (путь должен заканчиваться на "ollama-test")
4. Если ошибка связана с правами доступа, запустите PowerShell от имени администратора
