"use client";

import { useState, useEffect } from "react";

interface ProgramFormData {
  name: string;
  description?: string;
  type: string;
  variant: string;
  difficulty: string;
  restBetweenSets?: number;
  targetReps?: number;
  timeLimit?: number;
  duration?: number;
  allowRest?: boolean;
  sets?: number;
  repsPerSet?: number;
  repsSequence?: number[];
  repsPerMinute?: number;
  totalMinutes?: number;
  isCustom: boolean;
  isFeatured: boolean;
}

interface Props {
  program?: any;
  onSubmit: (data: ProgramFormData) => Promise<void>;
  onCancel: () => void;
}

const inputClass = "w-full px-3 py-2 bg-[#1B1F3B] border border-white/10 rounded-lg text-[#F4F4F4] focus:border-[#00BFFF] focus:outline-none";
const labelClass = "block text-sm font-medium text-[#F4F4F4] mb-1";

export default function ProgramForm({ program, onSubmit, onCancel }: Props) {
  const [formData, setFormData] = useState<ProgramFormData>({
    name: "",
    type: "FREE_MODE",
    variant: "STANDARD",
    difficulty: "BEGINNER",
    isCustom: false,
    isFeatured: false,
  });

  const [repsSequenceInput, setRepsSequenceInput] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (program) {
      setFormData({
        name: program.name || "",
        description: program.description,
        type: program.type || "FREE_MODE",
        variant: program.variant || "STANDARD",
        difficulty: program.difficulty || "BEGINNER",
        restBetweenSets: program.restBetweenSets,
        targetReps: program.targetReps,
        timeLimit: program.timeLimit,
        duration: program.duration,
        allowRest: program.allowRest,
        sets: program.sets,
        repsPerSet: program.repsPerSet,
        repsSequence: program.repsSequence,
        repsPerMinute: program.repsPerMinute,
        totalMinutes: program.totalMinutes,
        isCustom: program.isCustom || false,
        isFeatured: program.isFeatured || false,
      });
      if (program.repsSequence) {
        setRepsSequenceInput(program.repsSequence.join(", "));
      }
    }
  }, [program]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await onSubmit(formData);
    } finally {
      setLoading(false);
    }
  };

  const updateRepsSequence = (value: string) => {
    setRepsSequenceInput(value);
    if (value.trim()) {
      const sequence = value.split(",").map(s => parseInt(s.trim())).filter(n => !isNaN(n));
      setFormData({ ...formData, repsSequence: sequence.length > 0 ? sequence : undefined });
    } else {
      setFormData({ ...formData, repsSequence: undefined });
    }
  };

  const showTargetReps = formData.type === "TARGET_REPS";
  const showMaxTime = formData.type === "MAX_TIME";
  const showSetsReps = formData.type === "SETS_REPS";
  const showPyramid = formData.type === "PYRAMID";
  const showEmom = formData.type === "EMOM";
  const showAmrap = formData.type === "AMRAP";

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-2">
          <label className={labelClass}>Name *</label>
          <input type="text" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className={inputClass} />
        </div>

        <div className="col-span-2">
          <label className={labelClass}>Description</label>
          <textarea value={formData.description || ""} onChange={(e) => setFormData({ ...formData, description: e.target.value || undefined })} className={inputClass} rows={3} />
        </div>

        <div className="col-span-2">
          <label className={labelClass}>Type *</label>
          <select required value={formData.type} onChange={(e) => setFormData({ ...formData, type: e.target.value })} className={inputClass}>
            <option value="FREE_MODE">FREE MODE - No constraints</option>
            <option value="TARGET_REPS">TARGET REPS - Reach a number of reps</option>
            <option value="MAX_TIME">MAX TIME - Max reps in time limit</option>
            <option value="SETS_REPS">SETS & REPS - Fixed sets and reps</option>
            <option value="PYRAMID">PYRAMID - Ascending/descending reps</option>
            <option value="EMOM">EMOM - Every Minute On the Minute</option>
            <option value="AMRAP">AMRAP - As Many Reps As Possible</option>
          </select>
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
          </select>
        </div>

        <div className="col-span-2">
          <label className={labelClass}>Rest Between Sets (seconds)</label>
          <input type="number" value={formData.restBetweenSets || ""} onChange={(e) => setFormData({ ...formData, restBetweenSets: e.target.value ? parseInt(e.target.value) : undefined })} className={inputClass} />
        </div>

        {showTargetReps && (
          <>
            <div>
              <label className={labelClass}>Target Reps *</label>
              <input type="number" required value={formData.targetReps || ""} onChange={(e) => setFormData({ ...formData, targetReps: parseInt(e.target.value) })} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Time Limit (seconds)</label>
              <input type="number" value={formData.timeLimit || ""} onChange={(e) => setFormData({ ...formData, timeLimit: e.target.value ? parseInt(e.target.value) : undefined })} className={inputClass} placeholder="Optional" />
            </div>
          </>
        )}

        {showMaxTime && (
          <>
            <div>
              <label className={labelClass}>Duration (seconds) *</label>
              <input type="number" required value={formData.duration || ""} onChange={(e) => setFormData({ ...formData, duration: parseInt(e.target.value) })} className={inputClass} />
            </div>
            <div className="flex items-center gap-2">
              <input type="checkbox" id="allowRest" checked={formData.allowRest || false} onChange={(e) => setFormData({ ...formData, allowRest: e.target.checked })} className="w-4 h-4" />
              <label htmlFor="allowRest" className="text-sm font-medium text-[#F4F4F4]">Allow Rest</label>
            </div>
          </>
        )}

        {showSetsReps && (
          <>
            <div>
              <label className={labelClass}>Sets *</label>
              <input type="number" required value={formData.sets || ""} onChange={(e) => setFormData({ ...formData, sets: parseInt(e.target.value) })} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Reps Per Set *</label>
              <input type="number" required value={formData.repsPerSet || ""} onChange={(e) => setFormData({ ...formData, repsPerSet: parseInt(e.target.value) })} className={inputClass} />
            </div>
          </>
        )}

        {showPyramid && (
          <div className="col-span-2">
            <label className={labelClass}>Reps Sequence *</label>
            <input type="text" required value={repsSequenceInput} onChange={(e) => updateRepsSequence(e.target.value)} className={inputClass} placeholder="e.g., 1, 2, 3, 4, 5, 4, 3, 2, 1" />
            <p className="text-sm text-[#B0B3B8] mt-1">Enter numbers separated by commas</p>
          </div>
        )}

        {showEmom && (
          <>
            <div>
              <label className={labelClass}>Reps Per Minute *</label>
              <input type="number" required value={formData.repsPerMinute || ""} onChange={(e) => setFormData({ ...formData, repsPerMinute: parseInt(e.target.value) })} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Total Minutes *</label>
              <input type="number" required value={formData.totalMinutes || ""} onChange={(e) => setFormData({ ...formData, totalMinutes: parseInt(e.target.value) })} className={inputClass} />
            </div>
          </>
        )}

        {showAmrap && (
          <div className="col-span-2">
            <label className={labelClass}>Duration (seconds) *</label>
            <input type="number" required value={formData.duration || ""} onChange={(e) => setFormData({ ...formData, duration: parseInt(e.target.value) })} className={inputClass} />
          </div>
        )}

        <div className="col-span-2 space-y-2">
          <div className="flex items-center gap-2">
            <input type="checkbox" id="isCustom" checked={formData.isCustom} onChange={(e) => setFormData({ ...formData, isCustom: e.target.checked })} className="w-4 h-4" />
            <label htmlFor="isCustom" className="text-sm font-medium text-[#F4F4F4]">Custom Program</label>
          </div>
          <div className="flex items-center gap-2">
            <input type="checkbox" id="isFeatured" checked={formData.isFeatured} onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })} className="w-4 h-4" />
            <label htmlFor="isFeatured" className="text-sm font-medium text-[#F4F4F4]">Featured Program</label>
          </div>
        </div>
      </div>

      <div className="flex gap-4 pt-4 border-t border-white/10">
        <button type="submit" disabled={loading} className="flex-1 py-3 bg-gradient-to-r from-[#00BFFF] to-[#8E2DE2] text-white rounded-lg font-semibold hover:opacity-90 disabled:opacity-50">
          {loading ? "Saving..." : program ? "Update Program" : "Create Program"}
        </button>
        <button type="button" onClick={onCancel} className="px-8 py-3 border-2 border-white/10 rounded-lg font-semibold text-[#B0B3B8] hover:bg-[#1B1F3B]">
          Cancel
        </button>
      </div>
    </form>
  );
}
