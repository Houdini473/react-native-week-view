declare module "react-native-week-view" {
  // this wasn't working until I moved these import statements into this
  // module block
  import type { Ref } from "react";
  import type { LessonHistory } from "./User";
  import type { Recurrence } from "./Calendar";
  import type { NativeTouchEvent, ViewStyle } from "react-native";
  import type { ComponentType } from "react";

  declare function WeekView(props: WeekViewProps): JSX.Element;

  declare interface EventItemBase {
    // required from WeekView
    id: string;
    description: string;
    startDate: Date;
    endDate: Date;
    color: string;
    /// custom additional fields ///
    title: string;
    tutorId: string;
    studentId: string;
  }

  declare type SubmittedEventItem = EventItemBase &
    Omit<LessonHistory, "start" | "end" | "notes"> & {
      submitted: true;
      filler: false;
      recurrence: null;
    };

  declare interface UnsubmittedEventItem extends EventItemBase {
    /// custom additional fields ///
    recurrence: Recurrence;
    recurringEventId: string;
    filler: boolean;
    submitted: false;
  }

  declare type EventItem = SubmittedEventItem | UnsubmittedEventItem;

  declare interface WeekViewMethods {
    goToDate(date: Date, animated?: boolean): void;
    goToNextPage(animated?: boolean): void;
    goToPrevPage(animated?: boolean): void;
    scrollToTime(minutes: number, options: { animated: boolean }): void;
  }

  declare interface WeekViewProps {
    events: EventItem[];
    selectedDate: Date;
    numberOfDays: 1 | 3 | 5 | 7;
    onEventPress?: (event: EventItem) => void;
    onEventLongPress?: (event: EventItem) => void;
    onSwipeNext?: (date: Date) => void;
    onSwipePrev?: (date: Date) => void;
    onGridClick?: (
      pressEvent: NativeTouchEvent,
      startHour: number,
      date: Date
    ) => void;
    onGridLongPress?: (pressEvent: any, startHour: number, date: Date) => void;
    onDragEvent?: (
      event: EventItem,
      newStartDate: Date,
      newEndDate: Date
    ) => void;
    onDayPress?: (date: Date, formattedDate: string) => void;
    onMonthPress?: (date: Date, formattedDate: string) => void;
    onTimeScrolled?: (dateWithTime: string) => void;
    startHour?: number;
    weekStartsOn?: number;
    showTitle?: boolean;
    hoursInDisplay?: number;
    beginAgendaAt?: number;
    endAgendaAt?: number;
    timeStep?: number;
    formatDateHeader?: string;
    formatTimeLabel?: string;
    EventComponent?: ComponentType<any>;
    TodayHeaderComponent?: ComponentType<any>;
    DayHeaderComponent?: ComponentType<{
      date: string;
      formattedDate: string;
      textStyle: any;
      isToday: boolean;
      [key: string]: unknown;
    }>;
    showNowLine?: boolean;
    nowLineColor?: string;
    fixedHorizontally?: boolean;
    isRefreshing?: boolean;
    RefreshComponent?: ComponentType<any>;
    locale?: string;
    rightToLeft?: boolean;
    headerStyle?: CSSStyleSheet;
    headerTextStyle?: CSSStyleSheet;
    eventContainerStyle?: ViewStyle;
    gridRowStyle?: CSSStyleSheet;
    gridColumnStyle?: CSSStyleSheet;
    prependMostRecent?: boolean;
    ref?: Ref<WeekViewMethods>;
  }
}
