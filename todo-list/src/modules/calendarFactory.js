import { Calendar } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import { format } from 'date-fns';

export const calendarFactory = (() => {
    const calendarEl = document.getElementById('calendar');
    const switchToCalendarBtn = document.querySelector('#calendar-view-btn');

    function getButton() {
        return switchToCalendarBtn;
    }
    function parseEvents(tasksArray) {
        let eventList = [];
        for (let task of tasksArray) {
            let obj = {
                "title": task.title,
                "start": format(task.duedate, "yyyy-MM-dd"),
                "classNames": [],
            };
            if (task.getPriorityIndex() == 0) {
                obj.classNames = ['high-priority'];
            }
            if (task.getPriorityIndex() == 1) {
                obj.classNames = ['medium-priority'];
            }
            if (task.getPriorityIndex() == 2) {
                obj.classNames = ['low-priority'];
            }
            eventList.push(obj);
        }
        console.log(eventList);
        return eventList;
    }

    function renderCalendar(tasksArray) {
        const calendar = new Calendar(calendarEl, {
            plugins: [dayGridPlugin],
            initialDate: new Date(),
            navLinks: true, // can click day/week names to navigate views
            editable: true,
            dayMaxEvents: true, // allow "more" link when too many events
            events: parseEvents(tasksArray)
        });

        calendar.render();
    }
    return { renderCalendar, getButton };
})();

