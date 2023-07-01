const getHabits = () => {
  return [
    {
      name: "Quit smoking",
      id: "1",
      type: "boolean", // boolean or measurable
      dateCreated: "2023-06-26",
      color: "cyan", // color of ring progress
      frequency: 1, // days
      automaticSuccess: true, // habit succeeds by default
      weekEntries: [
        {
          weekNo: 0,
          firstDayOfWeek: "2023-06-26",
          dayEntries: [true, false, true, false, false, true, true],
        },
        {
          weekNo: 1,
          firstDayOfWeek: "2023-01-02",
          dayEntries: [true, true, true, true, true, true, true],
        },
        {
          weekNo: 4,
          firstDayOfWeek: "2023-01-21",
          dayEntries: [true, false, true, true, true, true, true],
        },
      ],
    },
    // {
    //   name: "Do 100 push-ups weekly",
    //   id: "2",
    //   type: "measurable", // boolean or measurable
    //   dateCreated: "20230102",
    //   color: "blue", // color of ring progress
    //   frequency: 7, // days
    //   automaticSuccess: true, // habit succeeds by default
    //   entries: [
    //     {
    //       weekNo: 1,
    //       firstDayDate: "20230102",
    //       entries: [100, 0, 0, 0, 0, 0, 22],
    //     },
    //     {
    //       weekNo: 4,
    //       firstDayDate: "20230121",
    //       entries: [5, 4, 0, 50, 0, 0, 2],
    //     },
    //   ],
    //   target: 100,
    // },
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
