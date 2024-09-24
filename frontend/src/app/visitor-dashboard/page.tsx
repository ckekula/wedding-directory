"use client";
import React, { Fragment } from "react";
import Header from "@/components/shared/Headers/Header";
import LeftSideBar from "@/components/visitor-dashboard/LeftSideBar";
import Image from "next/image";
import profilePic from "../../assets/images/dashboardProfilePic.jpg";
const VisitorDashboard = () => {
  return (
    <Fragment>
      <div>
        <div className="container">
          <Header />
        </div>
        <div className="bg-lightYellow flex">
          <div className="flex w-1/5 h-[calc(100vh-100px)]  items-center">
            <LeftSideBar />
          </div>
          <div className="w-4/5 py-10">
            <div className="mr-48">
              <div className="flex justify-evenly">
                <div className="flex ">
                  <div className="rounded-xl overflow-hidden transform -rotate-12 shadow-lg">
                    <Image
                      src={profilePic}
                      alt="dashboard profile picture"
                      className="w-[175px] h-[175px]"
                    />
                  </div>
                  <div className=" font-merriweather">
                    <div className="flex flex-col text-center">
                      <span className="block text-5xl font-bold">John</span>
                      <span className="block text-4xl font-bold">&</span>
                      <span className="block text-5xl font-bold ml-20">
                        Jane
                      </span>
                    </div>
                  </div>
                </div>

                <div className=" flex flex-col items-center ">
                  <p className="font-title text-4xl font-semibold">
                    Plan your wedding
                  </p>
                  <p className="font-body text-lg">All in one place</p>
                  <p className="font-body text-sm mt-4">Set Budget</p>
                </div>
              </div>
              <div className="flex mt-4 justify-center gap-8 font-body">
                <div>Add Date</div>
                <div>Add venue</div>
                <div>No of guests</div>
              </div>
              <hr className=" w-3/5 h-1 mx-auto my-4 bg-slate-400 border-0 rounded md:my-6 "></hr>

              <div className="flex justify-around">
                <div>Venodr block</div>
                <div>Venue block</div>
              </div>

              <div className="flex justify-around">
                <div>guest list block</div>
                <div>anouncement block</div>
              </div>

              <div className="flex justify-center">Wedding planning guide block</div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default VisitorDashboard;
