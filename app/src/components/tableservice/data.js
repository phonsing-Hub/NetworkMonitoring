const columns = [
  { name: "ID", uid: "id" },
  { name: "HOSTS", uid: "host" },
  { name: "STATUS", uid: "status" },
  { name: "MESSAGE", uid: "message" },
  { name: "RESPONSE TIME", uid: "responetime" },
  { name: "PRIORITY", uid: "priority" },
];

const hostname = [
  {
    id: 1,
    host: [ "T081B030B614H162", "10.101.54.149" ],
    status: "Up",
    message: "OK",
    responetime: "30ms",
    priority: 4,
    actions: "Actions",
  },
  {
    id: 2,
    host: [ "T081B030B615H162", "10.101.54.150" ],
    status: "Up",
    message: "OK",
    responetime: "30ms",
    priority: 4,
    actions: "Actions",
  },
  {
    id: 3,
    host: [ "T081B030B616H162", "10.101.54.151" ],
    status: "Up",
    message: "OK",
    responetime: "30ms",
    priority: 4,
    actions: "Actions",
  },
  {
    id: 4,
    host: [ "T081B030B617H162", "10.101.54.152" ],
    status: "Up",
    message: "OK",
    responetime: "30ms",
    priority: 4,
    actions: "Actions",
  },
];

export { columns, hostname };
