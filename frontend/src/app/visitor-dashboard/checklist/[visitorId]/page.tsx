"use client";

import React, { useState, useMemo } from "react";
import Breadcrumbs from "@/components/Breadcrumbs";
import { useQuery, useMutation } from "@apollo/client";
import { GET_VISITOR_CHECKLISTS } from "@/graphql/queries";
import {
  CREATE_CHECKLIST,
  UPDATE_CHECKLIST,
  DELETE_CHECKLIST,
} from "@/graphql/mutations";
import CategoryDropdown from "@/components/visitor-dashboard/checklist/CategoryDropDown";
import AddEditTaskModal from "@/components/visitor-dashboard/checklist/AddEditModal";
import { TaskType } from "@/types/taskTypes";
import ProgressBar from "@/components/visitor-dashboard/checklist/ProgressBar";
import { Button } from "@/components/ui/button";
import { IoAdd } from "react-icons/io5";
import { useParams } from 'next/navigation';
import toast from 'react-hot-toast';

const ChecklistPage = () => {

  const params = useParams();
  const { visitorId } = params;
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
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMonth, setSelectedMonth] = useState<string>("");
  const [showCompleted, setShowCompleted] = useState(false);

  // ... keeping all the existing memoized values and helper functions ...
  const tasks = useMemo(
    () => (data?.getVisitorChecklists as TaskType[]) || [],
    [data]
  );

  const categories = useMemo(
    () =>
      Array.from(
        new Set(tasks.map((task: TaskType) => task.category).filter(Boolean))
      ),
    [tasks]
  );

  const finalFilteredTasks = useMemo(() => {
    let filtered = tasks;
    if (searchQuery) {
      filtered = filtered.filter((task: TaskType) =>
        task.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    if (selectedMonth) {
      filtered = filtered.filter((task: TaskType) => {
        const dueDate = new Date(Number(task.due_date));
        const taskMonth = dueDate.toLocaleString("default", { month: "long" });
        return taskMonth === selectedMonth;
      });
    }
    if (showCompleted) {
      filtered = filtered.filter((task: TaskType) => task.completed);
    }
    return filtered;
  }, [tasks, searchQuery, selectedMonth, showCompleted]);

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
  try {
    await deleteTask({ variables: { id } });
    toast.success("Task deleted successfully!");
    refetch();
  } catch (error) {
    toast.error("Error deleting task");
    console.error("Error deleting task:", error);
  }
};

const handleSaveTask = async (taskInput: Partial<TaskType>) => {
  try {
    if (selectedTask) {
      // Ensure 'id' is present when updating
      if (!selectedTask.id) {
        throw new Error("Task ID is missing for update!");
      }

      console.log("Updating Task with ID:", selectedTask.id);
      await updateTask({
        variables: {
          input: {
            id: selectedTask.id,
            ...taskInput,
          },
        },
      });
      toast.success('Task Updated Successfully');
    } else {
      // Creating a new task
      console.log("Creating new Task:", taskInput);
      await createTask({
        variables: { input: { ...taskInput, visitorId } },
      });
      toast.success('Task Added Successfully');
    }
    setModalOpen(false);
    refetch();
  } catch (error) {
    toast.error('Error saving task');
    console.error("Error saving task:", error);
  }
  };
  
  


  const handleToggleComplete = async (id: string, completed: boolean) => {
    try {
      await updateTask({
        variables: { input: { id, completed } },
      });
      toast.success(
        `Task marked as ${completed ? "completed" : "incomplete"}!`
      );

      refetch();
    } catch (error) {
      toast.error("Error toggling task completion");
      console.error("Error toggling task completion:", error);
    }
  };

  if (!visitorId) {
    return (
      <div className="p-4 text-center">
        Please log in to view your checklist.
      </div>
    );
  }

  if (loading) {
    return <div className="p-4 text-center">Loading...</div>;
  }

  if (error) {
    return (
      <div className="p-4 text-center text-red-500">
        Error loading checklist: {error.message}
      </div>
    );
  }

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(
    (task: TaskType) => task.completed
  ).length;

  return (
      <div className="py-4 px-2 md:py-6 md:px-4">
        {/* Hide breadcrumbs on mobile */}
        <div className="hidden md:block shadow-md bg-white p-4 rounded-lg mb-4 md:mb-6">
          <Breadcrumbs
            items={[
              { label: "Dashboard", href: "/visitor-dashboard" },
              { label: "Checklist", href: "/visitor-dashboard/checklist" },
            ]}
          />
          <div>
            <h1 className="text-4xl md:text-3xl font-bold text-black font-title my-3">
              My Cheklist
            </h1>
            <p className="font-body text-xl text-black">Stay Organized and Stress Free.</p>
          </div>
        </div>

        {/* Main Content */}
        <div className="mt-6 md:mt-12 min-h-screen">
          {/* Controls Section */}
          <div className="flex flex-col items-center mb-4 md:mb-6 bg-white p-3 md:p-4 rounded-lg shadow-lg">
            {/* Header and Add Button */}
            <div className="flex flex-col md:flex-row justify-between items-center w-full gap-3 md:gap-0">
              <h1 className="text-2xl md:text-3xl font-bold font-title">
                Tasks
              </h1>
              <Button
                variant="signup"
                onClick={() => handleAddTask()}
                className="w-full md:w-auto"
              >
                <IoAdd className="mr-2 font-bold" /> Add Task
              </Button>
            </div>

            {/* Progress Bar */}
            <div className="w-full mt-4">
              <ProgressBar completed={completedTasks} total={totalTasks} />
            </div>

            {/* Filters */}
            <div className="flex flex-col md:flex-row justify-start items-stretch md:items-center gap-3 w-full mt-4">
              {/* Search Input */}
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="Search tasks..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full border-2 rounded-lg font-body p-2 focus:ring-2 focus:ring-orange focus:outline-none"
                />
              </div>

              {/* Month Selection */}
              <div className="flex-1 md:max-w-[200px]">
                <select
                  value={selectedMonth}
                  onChange={(e) => setSelectedMonth(e.target.value)}
                  className="w-full border-2 rounded-lg font-body border-slate-300 p-2 bg-white"
                >
                  <option value="" className="bg-white">
                    All Months
                  </option>
                  {Array.from({ length: 12 }).map((_, index) => {
                    const month = new Date(0, index).toLocaleString("default", {
                      month: "long",
                    });
                    return (
                      <option key={month} value={month}>
                        {month}
                      </option>
                    );
                  })}
                </select>
              </div>

              {/* Show Completed Toggle */}
              <div className="flex-1 md:flex-none">
                <label className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={showCompleted}
                    onChange={() => setShowCompleted(!showCompleted)}
                    className="hidden"
                  />
                  <span
                    className={`relative inline-block w-12 h-6 transition duration-200 ease-linear rounded-full ${
                      showCompleted ? "bg-slate-600" : "bg-orange"
                    }`}
                  >
                    <span
                      className={`absolute left-0 inline-block w-6 h-6 transform transition duration-100 ease-linear bg-white rounded-full ${
                        showCompleted
                          ? "translate-x-full bg-slate-600"
                          : "translate-x-0 bg-orange"
                      }`}
                    />
                  </span>
                  <span className="ml-3 text-sm font-body font-medium text-gray-900">
                    {showCompleted ? "Show All" : "Show Completed"}
                  </span>
                </label>
              </div>
            </div>
          </div>

          {/* Categories and Tasks */}
          <div className="bg-white p-3 md:p-4 rounded-lg shadow-lg">
            {(categories.length > 0 ? categories : fallbackCategories).map(
              (category) => (
                <CategoryDropdown
                  key={category}
                  category={category}
                  tasks={finalFilteredTasks.filter(
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

          {/* Modal */}
          <AddEditTaskModal
            isOpen={modalOpen}
            onClose={() => setModalOpen(false)}
            onSave={handleSaveTask}
            initialData={
              selectedTask
                ? {
                    id: selectedTask.id,
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
  );
};

export default ChecklistPage;