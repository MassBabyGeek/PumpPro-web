"use client";

import { useState, useEffect } from "react";

interface ChallengeTask {
  id?: string;
  day: number;
  title: string;
  description?: string;
  type?: string;
  variant?: string;
  targetReps?: number;
  duration?: number;
  sets?: number;
  repsPerSet?: number;
  scheduledDate?: string;
  isLocked: boolean;
  score?: number;
}

interface ChallengeFormData {
  title: string;
  description: string;
  category: string;
  type: string;
  variant: string;
  difficulty: string;
  targetReps?: number;
  duration?: number;
  sets?: number;
  repsPerSet?: number;
  imageUrl?: string;
  iconName: string;
  iconColor: string;
  points: number;
  badge?: string;
  startDate?: string;
  endDate?: string;
  status: string;
  tags: string[];
  isOfficial: boolean;
  challengeTasks: ChallengeTask[];
}

interface Props {
  challenge?: any;
  onSubmit: (data: ChallengeFormData) => Promise<void>;
  onCancel: () => void;
}

const inputClass = "w-full px-3 py-2 bg-[#1B1F3B] border border-white/10 rounded-lg text-[#F4F4F4] focus:border-[#00BFFF] focus:outline-none";
const labelClass = "block text-sm font-medium text-[#F4F4F4] mb-1";

export default function ChallengeForm({ challenge, onSubmit, onCancel }: Props) {
  const [formData, setFormData] = useState<ChallengeFormData>({
    title: "",
    description: "",
    category: "DAILY",
    type: "STANDARD",
    variant: "STANDARD",
    difficulty: "BEGINNER",
    iconName: "trophy",
    iconColor: "#FFD700",
    points: 10,
    status: "ACTIVE",
    tags: [],
    isOfficial: false,
    challengeTasks: [],
  });

  const [tagInput, setTagInput] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (challenge) {
      setFormData({
        title: challenge.title || "",
        description: challenge.description || "",
        category: challenge.category || "DAILY",
        type: challenge.type || "STANDARD",
        variant: challenge.variant || "STANDARD",
        difficulty: challenge.difficulty || "BEGINNER",
        targetReps: challenge.targetReps,
        duration: challenge.duration,
        sets: challenge.sets,
        repsPerSet: challenge.repsPerSet,
        imageUrl: challenge.imageUrl,
        iconName: challenge.iconName || "trophy",
        iconColor: challenge.iconColor || "#FFD700",
        points: challenge.points || 10,
        badge: challenge.badge,
        startDate: challenge.startDate ? new Date(challenge.startDate).toISOString().slice(0, 16) : undefined,
        endDate: challenge.endDate ? new Date(challenge.endDate).toISOString().slice(0, 16) : undefined,
        status: challenge.status || "ACTIVE",
        tags: challenge.tags || [],
        isOfficial: challenge.isOfficial || false,
        challengeTasks: challenge.challengeTasks || [],
      });
    }
  }, [challenge]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await onSubmit(formData);
    } finally {
      setLoading(false);
    }
  };

  const addTag = () => {
    if (tagInput && !formData.tags.includes(tagInput)) {
      setFormData({ ...formData, tags: [...formData.tags, tagInput] });
      setTagInput("");
    }
  };

  const removeTag = (tag: string) => {
    setFormData({ ...formData, tags: formData.tags.filter(t => t !== tag) });
  };

  const addTask = () => {
    const newTask: ChallengeTask = {
      day: formData.challengeTasks.length + 1,
      title: "",
      isLocked: false,
    };
    setFormData({ ...formData, challengeTasks: [...formData.challengeTasks, newTask] });
  };

  const updateTask = (index: number, field: keyof ChallengeTask, value: any) => {
    const tasks = [...formData.challengeTasks];
    tasks[index] = { ...tasks[index], [field]: value };
    setFormData({ ...formData, challengeTasks: tasks });
  };

  const removeTask = (index: number) => {
    setFormData({
      ...formData,
      challengeTasks: formData.challengeTasks.filter((_, i) => i !== index)
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-2">
          <label className={labelClass}>Title *</label>
          <input type="text" required value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} className={inputClass} />
        </div>

        <div className="col-span-2">
          <label className={labelClass}>Description *</label>
          <textarea required value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} className={inputClass} rows={3} />
        </div>

        <div>
          <label className={labelClass}>Category *</label>
          <select required value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} className={inputClass}>
            <option value="DAILY">DAILY</option>
            <option value="WEEKLY">WEEKLY</option>
            <option value="MONTHLY">MONTHLY</option>
            <option value="SPECIAL">SPECIAL</option>
          </select>
        </div>

        <div>
          <label className={labelClass}>Type *</label>
          <input type="text" required value={formData.type} onChange={(e) => setFormData({ ...formData, type: e.target.value })} className={inputClass} placeholder="e.g., STANDARD, PUSH_UP" />
        </div>

        <div>
          <label className={labelClass}>Variant *</label>
          <select required value={formData.variant} onChange={(e) => setFormData({ ...formData, variant: e.target.value })} className={inputClass}>
            <option value="STANDARD">STANDARD</option>
            <option value="INCLINE">INCLINE</option>
            <option value="DECLINE">DECLINE</option>
            <option value="DIAMOND">DIAMOND</option>
            <option value="WIDE">WIDE</option>
            <option value="PIKE">PIKE</option>
            <option value="ARCHER">ARCHER</option>
          </select>
        </div>

        <div>
          <label className={labelClass}>Difficulty *</label>
          <select required value={formData.difficulty} onChange={(e) => setFormData({ ...formData, difficulty: e.target.value })} className={inputClass}>
            <option value="BEGINNER">BEGINNER</option>
            <option value="INTERMEDIATE">INTERMEDIATE</option>
            <option value="ADVANCED">ADVANCED</option>
            <option value="EXPERT">EXPERT</option>
          </select>
        </div>

        <div>
          <label className={labelClass}>Target Reps</label>
          <input type="number" value={formData.targetReps || ""} onChange={(e) => setFormData({ ...formData, targetReps: e.target.value ? parseInt(e.target.value) : undefined })} className={inputClass} />
        </div>

        <div>
          <label className={labelClass}>Duration (minutes)</label>
          <input type="number" value={formData.duration || ""} onChange={(e) => setFormData({ ...formData, duration: e.target.value ? parseInt(e.target.value) : undefined })} className={inputClass} />
        </div>

        <div>
          <label className={labelClass}>Sets</label>
          <input type="number" value={formData.sets || ""} onChange={(e) => setFormData({ ...formData, sets: e.target.value ? parseInt(e.target.value) : undefined })} className={inputClass} />
        </div>

        <div>
          <label className={labelClass}>Reps Per Set</label>
          <input type="number" value={formData.repsPerSet || ""} onChange={(e) => setFormData({ ...formData, repsPerSet: e.target.value ? parseInt(e.target.value) : undefined })} className={inputClass} />
        </div>

        <div>
          <label className={labelClass}>Icon Name *</label>
          <input type="text" required value={formData.iconName} onChange={(e) => setFormData({ ...formData, iconName: e.target.value })} className={inputClass} placeholder="e.g., trophy, fire, star" />
        </div>

        <div>
          <label className={labelClass}>Icon Color *</label>
          <input type="color" required value={formData.iconColor} onChange={(e) => setFormData({ ...formData, iconColor: e.target.value })} className={inputClass} />
        </div>

        <div>
          <label className={labelClass}>Points *</label>
          <input type="number" required value={formData.points} onChange={(e) => setFormData({ ...formData, points: parseInt(e.target.value) })} className={inputClass} />
        </div>

        <div>
          <label className={labelClass}>Badge</label>
          <input type="text" value={formData.badge || ""} onChange={(e) => setFormData({ ...formData, badge: e.target.value || undefined })} className={inputClass} placeholder="e.g., gold_medal" />
        </div>

        <div>
          <label className={labelClass}>Image URL</label>
          <input type="url" value={formData.imageUrl || ""} onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value || undefined })} className={inputClass} />
        </div>

        <div>
          <label className={labelClass}>Status *</label>
          <select required value={formData.status} onChange={(e) => setFormData({ ...formData, status: e.target.value })} className={inputClass}>
            <option value="ACTIVE">ACTIVE</option>
            <option value="INACTIVE">INACTIVE</option>
            <option value="ARCHIVED">ARCHIVED</option>
            <option value="DRAFT">DRAFT</option>
          </select>
        </div>

        <div>
          <label className={labelClass}>Start Date</label>
          <input type="datetime-local" value={formData.startDate || ""} onChange={(e) => setFormData({ ...formData, startDate: e.target.value || undefined })} className={inputClass} />
        </div>

        <div>
          <label className={labelClass}>End Date</label>
          <input type="datetime-local" value={formData.endDate || ""} onChange={(e) => setFormData({ ...formData, endDate: e.target.value || undefined })} className={inputClass} />
        </div>

        <div className="col-span-2 flex items-center gap-2">
          <input type="checkbox" id="isOfficial" checked={formData.isOfficial} onChange={(e) => setFormData({ ...formData, isOfficial: e.target.checked })} className="w-4 h-4" />
          <label htmlFor="isOfficial" className="text-sm font-medium text-[#F4F4F4]">Official Challenge</label>
        </div>

        <div className="col-span-2">
          <label className={labelClass}>Tags</label>
          <div className="flex gap-2 mb-2">
            <input type="text" value={tagInput} onChange={(e) => setTagInput(e.target.value)} onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addTag())} className={inputClass} placeholder="Add tag and press Enter" />
            <button type="button" onClick={addTag} className="px-4 py-2 bg-[#00BFFF] text-white rounded-lg hover:bg-[#00BFFF]/80">Add</button>
          </div>
          <div className="flex flex-wrap gap-2">
            {formData.tags.map((tag) => (
              <span key={tag} className="px-3 py-1 bg-[#1B1F3B] text-[#F4F4F4] rounded-full text-sm flex items-center gap-2">
                {tag}
                <button type="button" onClick={() => removeTag(tag)} className="text-red-400 font-bold hover:text-red-300">×</button>
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 pt-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-[#F4F4F4]">Challenge Tasks</h3>
          <button type="button" onClick={addTask} className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600">Add Task</button>
        </div>

        <div className="space-y-4">
          {formData.challengeTasks.map((task, index) => (
            <div key={index} className="border border-white/10 rounded-lg p-4 bg-[#1B1F3B]">
              <div className="flex justify-between items-start mb-3">
                <h4 className="font-medium text-[#F4F4F4]">Task {index + 1}</h4>
                <button type="button" onClick={() => removeTask(index)} className="text-red-400 hover:text-red-300">Remove</button>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm text-[#B0B3B8] mb-1">Day *</label>
                  <input type="number" required value={task.day} onChange={(e) => updateTask(index, "day", parseInt(e.target.value))} className="w-full px-2 py-1 bg-[#2C2F38] border border-white/10 rounded text-[#F4F4F4]" />
                </div>

                <div>
                  <label className="block text-sm text-[#B0B3B8] mb-1">Title *</label>
                  <input type="text" required value={task.title} onChange={(e) => updateTask(index, "title", e.target.value)} className="w-full px-2 py-1 bg-[#2C2F38] border border-white/10 rounded text-[#F4F4F4]" />
                </div>

                <div className="col-span-2">
                  <label className="block text-sm text-[#B0B3B8] mb-1">Description</label>
                  <input type="text" value={task.description || ""} onChange={(e) => updateTask(index, "description", e.target.value || undefined)} className="w-full px-2 py-1 bg-[#2C2F38] border border-white/10 rounded text-[#F4F4F4]" />
                </div>

                <div>
                  <label className="block text-sm text-[#B0B3B8] mb-1">Type</label>
                  <input type="text" value={task.type || ""} onChange={(e) => updateTask(index, "type", e.target.value || undefined)} className="w-full px-2 py-1 bg-[#2C2F38] border border-white/10 rounded text-[#F4F4F4]" />
                </div>

                <div>
                  <label className="block text-sm text-[#B0B3B8] mb-1">Variant</label>
                  <input type="text" value={task.variant || ""} onChange={(e) => updateTask(index, "variant", e.target.value || undefined)} className="w-full px-2 py-1 bg-[#2C2F38] border border-white/10 rounded text-[#F4F4F4]" />
                </div>

                <div>
                  <label className="block text-sm text-[#B0B3B8] mb-1">Target Reps</label>
                  <input type="number" value={task.targetReps || ""} onChange={(e) => updateTask(index, "targetReps", e.target.value ? parseInt(e.target.value) : undefined)} className="w-full px-2 py-1 bg-[#2C2F38] border border-white/10 rounded text-[#F4F4F4]" />
                </div>

                <div>
                  <label className="block text-sm text-[#B0B3B8] mb-1">Duration</label>
                  <input type="number" value={task.duration || ""} onChange={(e) => updateTask(index, "duration", e.target.value ? parseInt(e.target.value) : undefined)} className="w-full px-2 py-1 bg-[#2C2F38] border border-white/10 rounded text-[#F4F4F4]" />
                </div>

                <div>
                  <label className="block text-sm text-[#B0B3B8] mb-1">Sets</label>
                  <input type="number" value={task.sets || ""} onChange={(e) => updateTask(index, "sets", e.target.value ? parseInt(e.target.value) : undefined)} className="w-full px-2 py-1 bg-[#2C2F38] border border-white/10 rounded text-[#F4F4F4]" />
                </div>

                <div>
                  <label className="block text-sm text-[#B0B3B8] mb-1">Reps Per Set</label>
                  <input type="number" value={task.repsPerSet || ""} onChange={(e) => updateTask(index, "repsPerSet", e.target.value ? parseInt(e.target.value) : undefined)} className="w-full px-2 py-1 bg-[#2C2F38] border border-white/10 rounded text-[#F4F4F4]" />
                </div>

                <div>
                  <label className="block text-sm text-[#B0B3B8] mb-1">Score</label>
                  <input type="number" value={task.score || ""} onChange={(e) => updateTask(index, "score", e.target.value ? parseInt(e.target.value) : undefined)} className="w-full px-2 py-1 bg-[#2C2F38] border border-white/10 rounded text-[#F4F4F4]" />
                </div>

                <div>
                  <label className="block text-sm text-[#B0B3B8] mb-1">Scheduled Date</label>
                  <input type="datetime-local" value={task.scheduledDate || ""} onChange={(e) => updateTask(index, "scheduledDate", e.target.value || undefined)} className="w-full px-2 py-1 bg-[#2C2F38] border border-white/10 rounded text-[#F4F4F4]" />
                </div>

                <div className="flex items-center gap-2">
                  <input type="checkbox" checked={task.isLocked} onChange={(e) => updateTask(index, "isLocked", e.target.checked)} className="w-4 h-4" />
                  <label className="text-sm text-[#B0B3B8]">Is Locked</label>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex gap-4 pt-4 border-t border-white/10">
        <button type="submit" disabled={loading} className="flex-1 py-3 bg-gradient-to-r from-[#00BFFF] to-[#8E2DE2] text-white rounded-lg font-semibold hover:opacity-90 disabled:opacity-50">
          {loading ? "Saving..." : challenge ? "Update Challenge" : "Create Challenge"}
        </button>
        <button type="button" onClick={onCancel} className="px-8 py-3 border-2 border-white/10 rounded-lg font-semibold text-[#B0B3B8] hover:bg-[#1B1F3B]">
          Cancel
        </button>
      </div>
    </form>
  );
}
