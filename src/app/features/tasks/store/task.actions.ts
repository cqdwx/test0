import { createAction, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { Task, TaskAdditionalInfoTargetPanel, TaskWithSubTasks } from '../task.model';
import { IssueDataReduced } from '../../issue/issue.model';
import { RoundTimeOption } from '../../project/project.model';
import { WorkContextType } from '../../work-context/work-context.model';

enum TaskActionTypes {
  'SetCurrentTask' = '[Task] SetCurrentTask',
  'SetSelectedTask' = '[Task] SetSelectedTask',
  'UnsetCurrentTask' = '[Task] UnsetCurrentTask',

  // Task Actions
  'AddTask' = '[Task][Issue] Add Task',
  'UpdateTaskUi' = '[Task] Update Task Ui',
  'UpdateTaskTags' = '[Task] Update Task Tags',
  'RemoveTagsForAllTasks' = '[Task] Remove Tags from all Tasks',
  'ToggleTaskShowSubTasks' = '[Task] Toggle Show Sub Tasks',
  'UpdateTask' = '[Task] Update Task',
  'UpdateTasks' = '[Task] Update Tasks',
  'DeleteTask' = '[Task] Delete Task',
  'DeleteMainTasks' = '[Task] Delete Main Tasks',
  'UndoDeleteTask' = '[Task] Undo Delete Task',
  'MoveSubTask' = '[Task] Move sub task',
  'MoveSubTaskUp' = '[Task] Move up',
  'MoveSubTaskDown' = '[Task] Move down',
  'AddTimeSpent' = '[Task] Add time spent',
  'RemoveTimeSpent' = '[Task] Remove time spent',

  // Reminders & StartAt
  'ScheduleTask' = '[Task] Schedule',
  'UnScheduleTask' = '[Task] UnSchedule',
  'ReScheduleTask' = '[Task] ReSchedule',

  // Sub Task Actions
  'AddSubTask' = '[Task] Add SubTask',
  'ConvertToMainTask' = '[Task] Convert SubTask to main task',

  // Other
  'RestoreTask' = '[Task] Restore Task',
  'MoveToArchive' = '[Task] Move to archive',
  'MoveToOtherProject' = '[Task] Move tasks to other project',
  'ToggleStart' = '[Task] Toggle start',
  'RoundTimeSpentForDay' = '[Task] RoundTimeSpentForDay',
}

export const setCurrentTask = createAction(
  TaskActionTypes.SetCurrentTask,
  props<{
    id: string | null;
  }>(),
);

export const setSelectedTask = createAction(
  TaskActionTypes.SetSelectedTask,
  props<{
    id: string | null;
    taskAdditionalInfoTargetPanel?: TaskAdditionalInfoTargetPanel;
  }>(),
);

export const unsetCurrentTask = createAction(TaskActionTypes.UnsetCurrentTask);

export const addTask = createAction(
  TaskActionTypes.AddTask,
  props<{
    task: Task;
    issue?: IssueDataReduced;
    workContextId: string;
    workContextType: WorkContextType;
    isAddToBacklog: boolean;
    isAddToBottom: boolean;
  }>(),
);

export const updateTask = createAction(
  TaskActionTypes.UpdateTask,
  props<{ task: Update<Task> }>(),
);

export const updateTaskUi = createAction(
  TaskActionTypes.UpdateTaskUi,
  props<{ task: Update<Task> }>(),
);

export const updateTaskTags = createAction(
  TaskActionTypes.UpdateTaskTags,
  props<{ task: Task; newTagIds: string[]; oldTagIds: string[] }>(),
);

export const removeTagsForAllTasks = createAction(
  TaskActionTypes.RemoveTagsForAllTasks,
  props<{ tagIdsToRemove: string[] }>(),
);

export const toggleTaskShowSubTasks = createAction(
  TaskActionTypes.ToggleTaskShowSubTasks,
  props<{ taskId: string; isShowLess: boolean; isEndless: boolean }>(),
);

export const updateTasks = createAction(
  TaskActionTypes.UpdateTasks,
  props<{ tasks: Update<Task>[] }>(),
);

export const deleteTask = createAction(
  TaskActionTypes.DeleteTask,
  props<{ task: TaskWithSubTasks }>(),
);

export const deleteMainTasks = createAction(
  TaskActionTypes.DeleteMainTasks,
  props<{ taskIds: string[] }>(),
);

export const undoDeleteTask = createAction(TaskActionTypes.UndoDeleteTask);

export const moveSubTask = createAction(
  TaskActionTypes.MoveSubTask,
  props<{
    taskId: string;
    srcTaskId: string;
    targetTaskId: string;
    newOrderedIds: string[];
  }>(),
);

export const moveSubTaskUp = createAction(
  TaskActionTypes.MoveSubTaskUp,

  props<{ id: string; parentId: string }>(),
);

export const moveSubTaskDown = createAction(
  TaskActionTypes.MoveSubTaskDown,

  props<{ id: string; parentId: string }>(),
);

export const addTimeSpent = createAction(
  TaskActionTypes.AddTimeSpent,

  props<{ task: Task; date: string; duration: number }>(),
);

export const removeTimeSpent = createAction(
  TaskActionTypes.RemoveTimeSpent,

  props<{ id: string; date: string; duration: number }>(),
);

// Reminder Actions
export const scheduleTask = createAction(
  TaskActionTypes.ScheduleTask,

  props<{
    task: Task;
    plannedAt: number;
    remindAt?: number;
    isMoveToBacklog: boolean;
  }>(),
);

export const reScheduleTask = createAction(
  TaskActionTypes.ReScheduleTask,

  props<{
    task: Task;
    plannedAt: number;
    isMoveToBacklog: boolean;
    remindAt?: number;
  }>(),
);

export const unScheduleTask = createAction(
  TaskActionTypes.UnScheduleTask,

  props<{ id: string; reminderId?: string; isSkipToast?: boolean }>(),
);

export const restoreTask = createAction(
  TaskActionTypes.RestoreTask,

  props<{ task: Task | TaskWithSubTasks; subTasks: Task[] }>(),
);

export const addSubTask = createAction(
  TaskActionTypes.AddSubTask,

  props<{ task: Task; parentId: string }>(),
);

export const convertToMainTask = createAction(
  TaskActionTypes.ConvertToMainTask,

  props<{ task: Task; parentTagIds: string[] }>(),
);

export const moveToArchive = createAction(
  TaskActionTypes.MoveToArchive,

  props<{ tasks: TaskWithSubTasks[] }>(),
);

export const moveToOtherProject = createAction(
  TaskActionTypes.MoveToOtherProject,

  props<{ task: TaskWithSubTasks; targetProjectId: string }>(),
);

export const toggleStart = createAction(TaskActionTypes.ToggleStart);

export const roundTimeSpentForDay = createAction(
  TaskActionTypes.RoundTimeSpentForDay,

  props<{
    day: string;
    taskIds: string[];
    roundTo: RoundTimeOption;
    isRoundUp: boolean;
    projectId?: string | null;
  }>(),
);
