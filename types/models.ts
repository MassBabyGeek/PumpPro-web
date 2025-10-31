// Backend models TypeScript definitions

export interface DateFields {
  createdBy?: string;
  updatedBy?: string;
  deletedAt?: string;
  deletedBy?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface UserProfile extends DateFields {
  id?: string;
  name: string;
  email: string;
  avatar?: string;
  age?: number;
  weight?: number;
  height?: number;
  goal?: string;
  provider?: string;
  score: number;
  isAdmin: boolean;
  joinDate?: string;
  profilePicture?: string;
}

export interface UserCreator {
  id: string;
  name: string;
  avatar?: string;
}

export interface ChartData {
  date: string;
  pushUps: number;
  duration: number;
  calories: number;
}

export interface ChallengeTask extends DateFields {
  id: string;
  challengeId: string;
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
  userProgress?: UserChallengeTaskProgress;
  creator?: UserCreator;
}

export interface Challenge extends DateFields {
  id: string;
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
  participants: number;
  completions: number;
  likes: number;
  points: number;
  badge?: string;
  startDate?: string;
  endDate?: string;
  status: string;
  userCompleted?: boolean;
  userLiked?: boolean;
  userParticipated?: boolean;
  overallProgress?: number;
  tags?: string[];
  isOfficial: boolean;
  challengeTasks?: ChallengeTask[];
  creator?: UserCreator;
}

export interface UserChallengeProgress extends DateFields {
  id: string;
  challengeId: string;
  userId: string;
  progress: number;
  currentReps: number;
  targetReps: number;
  attempts: number;
  completedAt?: string;
}

export interface UserChallengeTaskProgress {
  id: string;
  userId: string;
  taskId: string;
  challengeId: string;
  completed: boolean;
  completedAt?: string;
  score?: number;
  attempts: number;
  createdAt: string;
  updatedAt: string;
}

export interface WorkoutProgram extends DateFields {
  id: string;
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
  usageCount: number;
  likes: number;
  userLiked?: boolean;
  creator?: UserCreator;
}

export interface WorkoutSession extends DateFields {
  sessionId: string;
  id?: string;
  programId: string;
  userId: string;
  challengeId?: string;
  challengeTaskId?: string;
  startTime: string;
  endTime?: string;
  totalReps: number;
  totalDuration: number;
  completed: boolean;
  notes?: string;
  likes: number;
  userLiked: boolean;
  sets: any[];
  creator?: UserCreator;
  user?: UserCreator;
}

export interface Stats {
  totalWorkouts: number;
  totalPushUps: number;
  totalCalories: number;
  totalTime: number;
  bestSession: number;
  averagePushUps: number;
}

export interface LeaderboardEntry {
  userId: string;
  userName: string;
  avatar?: string;
  rank: number;
  score: number;
  totalCalories: number;
  totalSessions: number;
  bestSessionReps: number;
  currentStreak: number;
  change?: number;
  badges?: string[];
}

export interface UserRank {
  userId: string;
  rank: number;
  score: number;
  totalUsers: number;
  percentile: number;
}

export interface BugReport {
  id: string;
  userId?: string;
  title: string;
  description: string;
  category: string;
  severity: string;
  status: string;
  deviceInfo?: any;
  appVersion?: string;
  pageUrl?: string;
  errorStack?: string;
  screenshotUrl?: string;
  userEmail?: string;
  createdAt: string;
  updatedAt: string;
  resolvedAt?: string;
  resolvedBy?: string;
  adminNotes?: string;
}

export type EntityType = "challenge" | "program" | "workout" | "comment";

export interface Like {
  id: string;
  userId: string;
  entityType: EntityType;
  entityId: string;
  createdAt: string;
}

export interface LikeInfo {
  totalLikes: number;
  userLiked: boolean;
}

export interface RefreshToken extends DateFields {
  id: string;
  userId: string;
  expiresAt: string;
  revokedAt?: string;
  ipAddress?: string;
  userAgent?: string;
}

export interface AuthResponse {
  user: UserProfile;
  token: string;
  refreshToken: string;
}

export interface AdminDashboardStats {
  totalUsers: number;
  activeUsers: number;
  totalChallenges: number;
  activeChallenges: number;
  totalPrograms: number;
  totalWorkouts: number;
  totalPushups: number;
  totalPhotos: number;
  totalBugReports: number;
  pendingBugReports: number;
  newUsersToday: number;
  newUsersThisWeek: number;
  newUsersThisMonth: number;
  workoutsToday: number;
  workoutsThisWeek: number;
  workoutsThisMonth: number;
  avgPushupsPerUser: number;
  avgWorkoutsPerUser: number;
  storageUsed: string;
  generatedAt: string;
}

export interface AdminUserListItem {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  isAdmin: boolean;
  score: number;
  totalWorkouts: number;
  totalPushups: number;
  joinDate: string;
  lastActive?: string;
  status: string;
}

export interface Photo {
  id: string;
  url: string;
  type: string;
  userId?: string;
  user?: UserCreator;
  createdAt: string;
}

// Bug Report types
export interface BugReport {
  id: string;
  userId?: string;
  title: string;
  description: string;
  category: string; // bug, crash, ui, feature-request, other
  severity: string; // low, medium, high, critical
  status: string; // open, in-progress, resolved, closed
  deviceInfo?: any;
  appVersion?: string;
  pageUrl?: string;
  errorStack?: string;
  screenshotUrl?: string;
  userEmail?: string;
  createdAt: string;
  updatedAt: string;
  resolvedAt?: string;
  resolvedBy?: string;
  adminNotes?: string;
}

export interface BugReportStats {
  total: number;
  open: number;
  inProgress: number;
  resolved: number;
  closed: number;
  critical: number;
  high: number;
  medium: number;
  low: number;
}

// Admin-specific types
export interface AdminActivity {
  id: string;
  type: "workout" | "challenge_completed" | "user_joined" | "program_created";
  userId: string;
  userName: string;
  userAvatar?: string;
  details: string;
  timestamp: string;
}

export interface SystemHealth {
  database: {
    status: "healthy" | "degraded" | "down";
    responseTime: number;
    size: string;
  };
  uptime: number;
  activeSessions: number;
  timestamp: string;
}

export interface TopContent {
  topChallenges: Array<{
    id: string;
    title: string;
    likes: number;
    participants: number;
    completions: number;
  }>;
  topPrograms: Array<{
    id: string;
    name: string;
    usageCount: number;
    likes: number;
  }>;
  topUsers: Array<{
    id: string;
    name: string;
    avatar?: string;
    totalWorkouts: number;
    totalPushups: number;
    score: number;
  }>;
}

export interface AnalyticsData {
  userGrowth: Array<{
    date: string;
    count: number;
    newUsers: number;
  }>;
  workoutActivity: Array<{
    date: string;
    totalWorkouts: number;
    totalPushups: number;
    avgDuration: number;
  }>;
  challengeStats: Array<{
    date: string;
    started: number;
    completed: number;
  }>;
}

export interface PaginationParams {
  limit?: number;
  offset?: number;
  search?: string;
  sort?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    total: number;
    limit: number;
    offset: number;
    hasMore: boolean;
  };
}
