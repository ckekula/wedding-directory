"use client";
import React, { useEffect, useState, useMemo } from "react";
import { ApolloProvider } from "@apollo/client";
import client from "@/apollo/apollo-client";
import Breadcrumbs from "@/components/Breadcrumbs";
import { useQuery, useMutation } from "@apollo/client";
import { useAuth } from "@/contexts/VisitorAuthContext";
import { GET_VISITOR_CHECKLISTS } from "@/graphql/queries";
import {
  CREATE_CHECKLIST,
  UPDATE_CHECKLIST,
  DELETE_CHECKLIST,
} from "@/graphql/mutations";
import CategoryDropdown from "../../../components/checklist/CategoryDropDown";
import AddEditTaskModal from "../../../components/checklist/AddEditModal";
import { TaskType } from "@/types/taskTypes";
import ProgressBar from "@/components/checklist/ProgressBar";
import { Button } from "@/components/ui/button";
import { IoAdd } from "react-icons/io5";

const ChecklistPage = () => {
  const { visitor } = useAuth();
  const visitorId = visitor?.id;

  const { data, loading, error, refetch } = useQuery(GET_VISITOR_CHECKLISTS, {
    variables: { visitorId },
    skip: !visitorId,
  });

  const [createTask] = useMutation(CREATE_CHECKLIST);
  const [updateTask] = useMutation(UPDATE_CHECKLIST);
  const [deleteTask] = useMutation(DELETE_CHECKLIST);

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<TaskType | null>(null);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  // Memoize tasks to prevent unnecessary re-renders
  const tasks = useMemo(
    () => (data?.getVisitorChecklists as TaskType[]) || [],
    [data]
  );

  // Memoize categories to prevent unnecessary re-renders
  const categories = useMemo(
    () =>
      Array.from(
        new Set(tasks.map((task: TaskType) => task.category).filter(Boolean))
      ),
    [tasks]
  );

  // Fallback predefined categories
  const fallbackCategories = [
    "Venue",
    "Wedding website",
    "Photos & videos",
    "Food & drink",
    "Attire",
    "Music",
    "Flower & Decor",
    "Registry",
    "Invitation & Paper",
    "Beauty",
    "Ceremony",
    "Guests",
    "Travel",
  ];

  // Move useEffect outside of conditional rendering
  useEffect(() => {
    console.log("Visitor ID:", visitorId);
    console.log("Raw GraphQL Data:", data);
    console.log("All Tasks:", tasks);
    console.log("Dynamically Generated Categories:", categories);

    // Log tasks for each category
    categories.forEach((category) => {
      const categoryTasks = tasks.filter(
        (task: TaskType) => task.category === category
      );
      console.log(`Tasks in ${category}:`, categoryTasks);
    });
  }, [visitorId, data, tasks, categories]);

  // Early return for loading and error states
  if (!visitorId) {
    console.warn("No visitor ID available");
    return <div>Please log in to view your checklist.</div>;
  }

  if (loading) {
    console.log("Loading checklists...");
    return <div>Loading...</div>;
  }

  if (error) {
    console.error("Checklist loading error:", error);
    return <div>Error loading checklist: {error.message}</div>;
  }

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(
    (task: TaskType) => task.completed
  ).length;

  const handleAddTask = (category?: string) => {
    setActiveCategory(category || null);
    setSelectedTask(null);
    setModalOpen(true);
  };

  const handleEditTask = (task: TaskType) => {
    setSelectedTask(task);
    setModalOpen(true);
  };

  const handleDeleteTask = async (id: string) => {
    await deleteTask({ variables: { id } });
    refetch();
  };

  const handleSaveTask = async (taskInput: Partial<TaskType>) => {
    if (selectedTask) {
      await updateTask({
        variables: { input: { id: selectedTask.id, ...taskInput } },
      });
    } else {
      await createTask({ variables: { input: { ...taskInput, visitorId } } });
    }
    setModalOpen(false);
    refetch();
  };
  const handleToggleComplete = async (id: string, completed: boolean) => {
    console.log("Toggling task:", { id, completed });
    try {
      const result = await updateTask({
        variables: {
          input: {
            id,
            completed,
          },
        },
      });
      console.log("Mutation result:", result);
      refetch(); // Force refetch to ensure data refresh
    } catch (error) {
      console.error("Error toggling task completion:", error);
    }
  };

  return (
    <ApolloProvider client={client}>
      <div className="py-6">
        <Breadcrumbs
          items={[
            { label: "Dashboard", href: "/visitor-dashboard" },
            { label: "Checklist", href: "/visior-dashboard/checklist" },
          ]}
        />
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-slate-800 font-title">
            Your Checklist
          </h1>
          <p className="text-slate-600 text-lg font-merriweather">
            Stay organized and stress-free
          </p>
        </div>
        <hr className="border-t-[3px] border-slate-600 my-4" />
        <div className="mt-12 min-h-screen">
          <div className="flex flex-col items-center mb-6 bg-white p-4 rounded-lg shadow-lg">
            <div className="flex justify-between items-center w-full">
              <h1 className="text-3xl font-bold font-title">Tasks</h1>
              <Button variant="signup" onClick={() => handleAddTask()}>
                <IoAdd className="mr-2 font-bold" /> Add Task
              </Button>
            </div>
            <div className="w-full mt-4">
              <ProgressBar completed={completedTasks} total={totalTasks} />
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-lg">
            {(categories.length > 0 ? categories : fallbackCategories).map(
              (category) => (
                <CategoryDropdown
                  key={category}
                  category={category}
                  tasks={tasks.filter(
                    (task: TaskType) => task.category === category
                  )}
                  onAddTask={() => handleAddTask(category)}
                  onEditTask={handleEditTask}
                  onDeleteTask={handleDeleteTask}
                  onToggleComplete={handleToggleComplete}
                />
              )
            )}
          </div>

          <AddEditTaskModal
            isOpen={modalOpen}
            onClose={() => setModalOpen(false)}
            onSave={handleSaveTask}
            initialData={
              selectedTask
                ? {
                    title: selectedTask.title,
                    due_date: selectedTask.due_date,
                    category: selectedTask.category,
                    notes: selectedTask.notes || "",
                  }
                : activeCategory
                ? {
                    title: "",
                    due_date: "",
                    category: activeCategory,
                    notes: "",
                  }
                : undefined
            }
          />
        </div>
      </div>
    </ApolloProvider>
  );
};

export default ChecklistPage;
