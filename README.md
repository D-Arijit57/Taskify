# Taskify

A simple and elegant task management board built with vanilla JavaScript and Tailwind CSS.  Organize your tasks across three workflow stages: To Do, In Progress, and Done. 

![Task Management System](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)

## ✨ Features

- **Three-Column Kanban Board**: Organize tasks in To Do, In Progress, and Done columns
- **Drag & Drop**:  Move tasks between columns with native HTML5 drag-and-drop
- **Task Management**: Create, move, and delete tasks with ease
- **Status Tracking**: Visual indicators showing task count in each column
- **Responsive Design**: Clean, modern UI built with Tailwind CSS
- **Persistent State**: Tasks are managed in-memory with object-based data structure

## 🚀 Getting Started

### Prerequisites

No build tools or dependencies required!  This is a pure HTML/CSS/JavaScript application.

### Installation

1. Clone the repository:
```bash
git clone https://github.com/D-Arijit57/Taskify.git
```

2. Navigate to the project directory:
```bash
cd Taskify
```

3. Open `index.html` in your browser:
```bash
# On macOS
open index.html

# On Linux
xdg-open index.html

# On Windows
start index.html
```

Or simply drag the `index.html` file into your browser.

## 📖 Usage

### Creating Tasks

1. Click the **+ Add New** button in any column
2. Enter your task description in the prompt
3. The task will appear in the selected column

### Moving Tasks

**Option 1: Drag & Drop**
- Click and hold a task card
- Drag it to the desired column
- Release to drop

**Option 2: Action Buttons**
- **To Do → In Progress**:  Click "Start"
- **In Progress → Done**:  Click "Finish"
- **Done**:  Click "Archive" (coming soon)

### Deleting Tasks

Click the trash icon (🗑️) in the top-right corner of any task card. 

## 🏗️ Architecture

### Data Structure

Each task is represented as an object: 
```javascript
{
  response: "Task description",
  status: "todo" | "progress" | "completed",
  id: 1 // Unique identifier
}
```

### Key Functions

- `addnewTodo()` - Creates a new task
- `moveTodo(id, newStatus)` - Changes task status
- `deleteTodo(id)` - Removes a task
- `render()` - Updates the UI based on current state
- `createComponent(todo)` - Generates task card HTML

## 📁 Project Structure

```
Taskify/
├── index.html          # Main HTML structure
├── script. js           # Application logic
├── PROJECT_TODO.md     # Development roadmap
└── README.md          # This file
```

## 🛠️ Technologies Used

- **HTML5** - Semantic markup and drag-and-drop API
- **CSS3** - Custom styling and animations
- **Tailwind CSS** - Utility-first CSS framework (via CDN)
- **Vanilla JavaScript** - No frameworks, pure ES6+

## 🔮 Roadmap

See [PROJECT_TODO.md](PROJECT_TODO.md) for the complete development plan.  Key upcoming features: 

### High Priority
- [ ] Replace `prompt()` with inline input form
- [ ] Implement localStorage persistence

### Medium Priority
- [ ] Add delete confirmation
- [ ] Undo functionality

### Low Priority
- [ ] Accessibility improvements (ARIA labels, keyboard shortcuts)
- [ ] Animation polish
- [ ] Unit tests

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is open source and available under the MIT License.

## 👤 Author

**Arijit Das** ([@D-Arijit57](https://github.com/D-Arijit57))

## 🙏 Acknowledgments

- Tailwind CSS for the beautiful utility classes
- Lucide React for icon inspiration

---

**Note**: This is a client-side only application. All tasks are stored in memory and will be lost on page refresh until localStorage persistence is implemented. 

For questions or suggestions, please open an issue on GitHub! 
