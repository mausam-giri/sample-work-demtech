interface UsersData {
  name: string;
  email: string;
}
export interface UserGroupData {
  id: string;
  name: string;
  users: UsersData[];
}
export const user_group: UserGroupData[] = [
  {
    id: "list001",
    name: "New Customers",
    users: [
      {
        name: "Amit Sharma",
        email: "amit.sharma@example.com",
      },
      {
        name: "Priya Mehta",
        email: "priya.mehta@example.com",
      },
      {
        name: "Ravi Kumar",
        email: "ravi.kumar@example.com",
      },
    ],
  },
  {
    id: "list002",
    name: "VIP Clients",
    users: [
      {
        name: "Sonia Gupta",
        email: "sonia.gupta@example.com",
      },
      {
        name: "Vikram Reddy",
        email: "vikram.reddy@example.com",
      },
      {
        name: "Neha Verma",
        email: "neha.verma@example.com",
      },
    ],
  },
  {
    id: "list003",
    name: "Interested Users",
    users: [
      {
        name: "Anil Joshi",
        email: "anil.joshi@example.com",
      },
      {
        name: "Kavita Desai",
        email: "kavita.desai@example.com",
      },
      {
        name: "Nitin Patel",
        email: "nitin.patel@example.com",
      },
    ],
  },
  {
    id: "list004",
    name: "Loyal Customers",
    users: [
      {
        name: "Deepak Singh",
        email: "deepak.singh@example.com",
      },
      {
        name: "Shreya Bhat",
        email: "shreya.bhat@example.com",
      },
      {
        name: "Arun Nair",
        email: "arun.nair@example.com",
      },
    ],
  },
  {
    id: "list005",
    name: "Newsletter Subscribers",
    users: [
      {
        name: "Sanjay Kumar",
        email: "sanjay.kumar@example.com",
      },
      {
        name: "Meera Pillai",
        email: "meera.pillai@example.com",
      },
      {
        name: "Ayesha Khan",
        email: "ayesha.khan@example.com",
      },
    ],
  },
  {
    id: "list006",
    name: "Annual Report Recipients",
    users: [
      {
        name: "Rajesh Rao",
        email: "rajesh.rao@example.com",
      },
      {
        name: "Rina Joshi",
        email: "rina.joshi@example.com",
      },
      {
        name: "Vijay Iyer",
        email: "vijay.iyer@example.com",
      },
    ],
  },
];
