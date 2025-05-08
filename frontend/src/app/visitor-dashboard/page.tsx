"use client";

import React, { Fragment, useState } from "react";
import Header from "@/components/shared/Headers/Header";
import { useQuery } from "@apollo/client";
import { useAuth } from "@/contexts/VisitorAuthContext";
import WeddingCoupleCard from "@/components/visitor-dashboard/WeddingCoupleCard";
import WeddingPlanningGuide from "@/components/visitor-dashboard/WeddingPlanningGuide";
import { StaticImageData } from "next/image";
import {
  GET_VISITOR_BY_ID,
  FIND_ALL_MY_VENDORS,
  FIND_GUESTLIST_BY_VISITOR,
  GET_BUDGET_TOOL,
  GET_VISITOR_CHECKLISTS,
} from "@/graphql/queries";
import Footer from "@/components/shared/Footer";
import LoaderHelix from "@/components/shared/Loaders/LoaderHelix";
import LeftSideBar from "@/components/visitor-dashboard/LeftSideBar";
import BottomNavigationBar from "@/components/visitor-dashboard/BottomNavigationBar";
import DashboardWidgets from "@/components/visitor-dashboard/DashBoardWidgets";

interface Guest {
  id: string;
  status: string;
}



interface BudgetItem {
  amountPaid?: number;
}

interface Checklist {
  completed: boolean;
}

const VisitorDashboard = () => {
  const { visitor } = useAuth();
  const [profilePic, setProfilePic] = useState<string | StaticImageData>(
    "/images/visitorProfilePic.webp"
  );
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  // Get visitor profile data
  const { data, loading, error } = useQuery(GET_VISITOR_BY_ID, {
    variables: { id: visitor?.id },
    skip: !visitor?.id,
    onCompleted: (data) => {
      if (data?.findVisitorById?.profile_pic_url) {
        setProfilePic(data.findVisitorById.profile_pic_url);
      }
    },
  });

  // Get my vendors data
  const { data: vendorsData } = useQuery(FIND_ALL_MY_VENDORS, {
    variables: { visitorId: visitor?.id },
    skip: !visitor?.id,
  });

  // Get guest list data
  const { data: guestListData } = useQuery(FIND_GUESTLIST_BY_VISITOR, {
    variables: { id: visitor?.id },
    skip: !visitor?.id,
  });

  // Get budget data
  const { data: budgetData } = useQuery(GET_BUDGET_TOOL, {
    variables: { visitorId: visitor?.id },
    skip: !visitor?.id,
  });

  // Get checklist data
  const { data: checklistData } = useQuery(GET_VISITOR_CHECKLISTS, {
    variables: { visitorId: visitor?.id },
    skip: !visitor?.id,
  });

  // Calculate all metrics
  const myVendors = vendorsData?.findAllMyVendors || [];
  const guestList = guestListData?.findGuestListsByVisitor || [];

  const attendingGuests = guestList.filter(
    (g: Guest) => g.status === "Attending"
  ).length;
  const declinedGuests = guestList.filter(
    (g: Guest) => g.status === "Declined"
  ).length;
  const invitedGuests = guestList.filter(
    (g: Guest) => g.status === "Invited"
  ).length;
  const notInvitedGuests = guestList.filter(
    (g: Guest) => g.status === "Not Invited"
  ).length;

  const budgetTool = budgetData?.budgetTool;
  const budgetTotal = budgetTool?.totalBudget || 0;
  const budgetItems = budgetTool?.budgetItems || [];

  const budgetSpent = budgetItems.reduce(
    (acc: number, item: BudgetItem) => acc + (item.amountPaid || 0),
    0
  );

  const budgetPercentage =
    budgetTotal > 0
      ? Math.min(Math.round((budgetSpent / budgetTotal) * 100 * 100) / 100, 100)
      : 0;

  const checklists = checklistData?.getVisitorChecklists || [];
  const completedTasks = checklists.filter(
    (task: Checklist) => task.completed
  ).length;
  const totalTasks = checklists.length;
  const checklistProgress =
    totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  if (loading) return <LoaderHelix />;
  if (error) return <p>Error loading profile information: {error.message}</p>;

  const visitorData = data?.findVisitorById;

  return (
    <Fragment>
      <div className="container mx-auto px-4">
        <Header />
      </div>

      <div className="bg-lightYellow min-h-screen">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {/* Left Sidebar - hidden on mobile */}
            <div
              className={`
                hidden md:block transition-all duration-300 ease-in-out
                ${
                  isSidebarCollapsed
                    ? "md:col-span-1"
                    : "md:col-span-2 lg:col-span-2"
                }
                pt-10
              `}
            >
              <div className="sticky top-4 pb-4">
                <LeftSideBar
                  visitorId={visitor?.id || null}
                  isCollapsed={isSidebarCollapsed}
                  onToggleCollapse={() =>
                    setIsSidebarCollapsed(!isSidebarCollapsed)
                  }
                />
              </div>
            </div>

            {/* Center Column */}
            <div
              className={`
                col-span-12 transition-all duration-300 ease-in-out
                ${
                  isSidebarCollapsed
                    ? "md:col-span-11"
                    : "md:col-span-10 lg:col-span-10"
                }
                pt-10
              `}
            >
              <div className="w-full pb-8">
                <WeddingCoupleCard
                  brideName={visitorData?.partner_fname}
                  groomName={visitorData?.visitor_fname}
                  weddingDate={visitorData?.wed_date}
                  profilePic={profilePic}
                  setProfilePic={setProfilePic}
                />
              </div>

              <DashboardWidgets
                myVendors={myVendors}
                attendingGuests={attendingGuests}
                declinedGuests={declinedGuests}
                invitedGuests={invitedGuests}
                notInvitedGuests={notInvitedGuests}
                totalGuests={guestList.length}
                budgetTotal={budgetTotal}
                budgetSpent={budgetSpent}
                budgetPercentage={budgetPercentage}
                completedTasks={completedTasks}
                totalTasks={totalTasks}
                checklistProgress={checklistProgress}
                visitorId={visitor?.id}
              />

              <div className="pt-5 pb-10">
                <WeddingPlanningGuide />
              </div>
            </div>
          </div>
        </div>
      </div>
      <BottomNavigationBar />
      <Footer />
    </Fragment>
  );
};

export default VisitorDashboard;
