const getHabits = () => {
  return [
    {
      // a boolean daily habit
      id: "1",
      name: "Quit smoking",
      question: "", //set by user optional
      notes: "", //set by user optional
      type: "Boolean", // Boolean or Measurable
      startDate: "2023-06-26", // when to start tracking habit
      color: "cyan", // color of ring progress

      target: {
        // applicable for habits that can be measured
        value: 1,
        unit: "",
      },

      schedule: {
        // 1 time every 1 day => daily
        day: 1,
        frequency: 1,
      },

      dailyDefault: 1, // daily default entry value. 1 or 0 if type is Boolean
      entries: [
        {
          date: "2023-07-04",
          value: 0,
        },
      ],

      reminder: {
        time: "",
        day: "",
      },
    },
    {
      // a measurable weekly habit
      id: "2",
      name: "Do 100 push-ups weekly",
      question: "", //set by user optional
      notes: "", //set by user optional
      type: "Measurable", // Boolean or Measurable
      startDate: "2023-06-28", // when to start tracking habit
      color: "red", // color of ring progress

      target: {
        // applicable for habits that can be measured
        value: 100,
        unit: "",
      },

      schedule: {
        // 1 time every 7 days => weekly
        day: 7,
        frequency: 1,
      },

      dailyDefault: 0, // daily default entry value
      entries: [
        {
          date: "2023-06-26",
          value: 0,
        },
      ],

      reminder: {
        time: "",
        day: "",
      },
    },
    {
      // a measurable weekly habit
      id: "2",
      name: "Read books",
      question: "", //set by user optional
      notes: "", //set by user optional
      type: "Measurable", // Boolean or Measurable
      startDate: "2023-06-28", // when to start tracking habit
      color: "blue", // color of ring progress

      target: {
        // applicable for habits that can be measured
        value: 100,
        unit: "pages",
      },

      schedule: {
        // 1 time every 2 days => alternate days
        day: 2,
        frequency: 1,
      },

      dailyDefault: 10, // daily default entry value
      entries: [
        {
          date: "2023-06-26",
          value: 0,
        },
      ],

      reminder: {
        time: "",
        day: "",
      },
    },
  ];
};

// data structure for firestore : subcollection

const users = [
  {
    email: "",
    password: "",
    dateJoined: "",
    habits: {
      // subcollection
    },
  },
];

export default getHabits;
