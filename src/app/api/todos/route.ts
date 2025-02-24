import { NextResponse } from 'next/server';

// In-memory todo storage (in real app, you'd use a database)
let todos: Todo[] = [];

interface Todo {
  id: string;
  title: string;
  completed: boolean;
}

// GET /api/todos - Get all todos
export async function GET() {
  return NextResponse.json(todos);
}

// POST /api/todos - Create a new todo
export async function POST(request: Request) {
  const body = await request.json();
  
  const newTodo: Todo = {
    id: Date.now().toString(),
    title: body.title,
    completed: false
  };
  
  todos.push(newTodo);
  return NextResponse.json(newTodo, { status: 201 });
}

// PUT /api/todos - Update a todo
export async function PUT(request: Request) {
  const body = await request.json();
  const todoIndex = todos.findIndex(todo => todo.id === body.id);
  
  if (todoIndex === -1) {
    return NextResponse.json(
      { error: 'Todo not found' },
      { status: 404 }
    );
  }
  
  todos[todoIndex] = { ...todos[todoIndex], ...body };
  return NextResponse.json(todos[todoIndex]);
}

// DELETE /api/todos - Delete a todo
export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  
  if (!id) {
    return NextResponse.json(
      { error: 'ID is required' },
      { status: 400 }
    );
  }
  
  const todoIndex = todos.findIndex(todo => todo.id === id);
  
  if (todoIndex === -1) {
    return NextResponse.json(
      { error: 'Todo not found' },
      { status: 404 }
    );
  }
  
  todos = todos.filter(todo => todo.id !== id);
  return NextResponse.json({ message: 'Todo deleted successfully' });
} 