import { useDispatch, useSelector } from "react-redux";
import Homelayout from "../../Layouts/Homelayout.jsx";
import { Chart as ChartJS,ArcElement,Tooltip, Legend,CategoryScale,LinearScale,BarElement,Title} from "chart.js"
import {FaUsers} from "react-icons/fa";
import {Bar, Pie} from "react-chartjs-2"
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { GetStats } from "../../Redux/Slices/StatSlice.js";
import { getPaymentRecord } from "../../Redux/Slices/RazorpaySlice.js";
import { GetAllCourses, removeCourseMethod } from "../../Redux/Slices/CourseSlices.js";
import { BsCollectionPlayFill, BsTrash } from "react-icons/bs";


ChartJS.register(ArcElement,Tooltip, Legend,CategoryScale,LinearScale,BarElement,Title);

const chartBaseOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "top",
      labels: {
        usePointStyle: true,
      },
    },
  },
};

const barOptions = {
  ...chartBaseOptions,
  scales: {
    x: {
      grid: {
        display: false,
      },
    },
    y: {
      beginAtZero: true,
      grid: {
        color: "rgba(148, 163, 184, 0.2)",
      },
    },
  },
};

function Dashboard() {

   const dispatch=useDispatch();
   const navigate=useNavigate();

    const {allUserCount,subscribedCount}=useSelector(state=>state?.stat)
    const myCourse=useSelector(state=>state?.course?.coursedata)
   
  const months = ["Januar","February","March","April","May","June","July","August","September","October","November","December"]
  
const MonthlySells = {
  labels: months,
  datasets: [{
    label: 'Sales Data',
    data: [65, 59, 80, 81, 56, 55, 40,59, 80, 81, 56, 55],
    backgroundColor: ['rgba(255, 99, 132, 0.2)','rgba(255, 159, 64, 0.2)','rgba(255, 205, 86, 0.2)','rgba(75, 192, 192, 0.2)','rgba(54, 162, 235, 0.2)','rgba(153, 102, 255, 0.2)','rgba(201, 203, 207, 0.2)','rgba(255, 159, 64, 0.2)','rgba(255, 205, 86, 0.2)','rgba(75, 192, 192, 0.2)','rgba(54, 162, 235, 0.2)','rgba(153, 102, 255, 0.2)','rgba(201, 203, 207, 0.2)'
    ],
    borderColor: ['rgb(255, 99, 132)','rgb(255, 159, 64)','rgb(255, 205, 86)','rgb(75, 192, 192)','rgb(54, 162, 235)','rgb(153, 102, 255)','rgb(255, 99, 132)','rgb(255, 159, 64)','rgb(255, 205, 86)','rgb(75, 192, 192)','rgb(54, 162, 235)','rgb(153, 102, 255)','rgb(201, 203, 207)'
    ],
    borderWidth: 1
  }]
};

  const UserDetails = {
  labels: ["Registered User","Enrolled User"],
  datasets: [{
    label: 'User details',
    data: [allUserCount, subscribedCount],
    backgroundColor: [
      "red",
      "blue",
    ],
    borderColor: [
      'rgb(255, 99, 132)',
      'rgb(255, 159, 64)',
    ],
    borderWidth: 1
  }]
};
   
    async function DeleteCourse(courseId) {
       if (window.confirm("Do you realy want to delete this course")) {
         const res=await dispatch(removeCourseMethod(courseId))
         if (res?.payload?.success) {
            dispatch(GetAllCourses())
         }
       }
    }

    async function downloadData() {
      await dispatch(GetAllCourses())
      await dispatch(GetStats())
      await dispatch(getPaymentRecord())
   }

   useEffect(()=>{
       downloadData()
   },[])

 
  return (
    <Homelayout>
      <div className="min-h-[calc(100vh-3rem)] bg-slate-50 px-4 py-16 text-slate-900 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-8">
          <div className="pt-8 text-center">
            <h1 className="text-4xl font-black tracking-tight text-teal-500 sm:text-5xl lg:text-6xl">
              Admin Dashboard
            </h1>
            <p className="mt-3 text-sm text-slate-500 sm:text-base">
              Track users, revenue, and course activity in one place.
            </p>
          </div>
          <div className="grid gap-6 xl:grid-cols-2">
            <section className="rounded-3xl border border-sky-200 bg-sky-100/80 p-6 shadow-lg">
              <div className="mx-auto h-[320px] w-full max-w-[420px]">
                <Pie data={UserDetails} options={chartBaseOptions} />
              </div>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="flex items-center justify-between rounded-2xl bg-white/70 p-5 shadow-sm">
                  <div className="flex flex-col items-start">
                    <p className="font-semibold text-slate-600">Registered users</p>
                    <h3 className="text-4xl font-bold text-slate-900">{allUserCount}</h3>
                  </div>
                  <FaUsers className="text-4xl text-teal-500" />
                </div>
                <div className="flex items-center justify-between rounded-2xl bg-white/70 p-5 shadow-sm">
                  <div className="flex flex-col items-start">
                    <p className="font-semibold text-slate-600">Enrolled users</p>
                    <h3 className="text-4xl font-bold text-slate-900">{subscribedCount}</h3>
                  </div>
                  <FaUsers className="text-4xl text-teal-500" />
                </div>
              </div>
            </section>

            <section className="rounded-3xl border border-sky-200 bg-sky-100/80 p-6 shadow-lg">
              <div className="h-[360px] w-full">
                <Bar data={MonthlySells} options={barOptions} />
              </div>
            </section>
          </div>

          <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-lg">
            <div className="overflow-x-auto">
              <table className="min-w-[1100px] w-full table-auto text-left text-slate-800">
                <thead className="bg-slate-100 text-slate-600">
                  <tr>
                    <th className="px-4 py-4">S. No.</th>
                    <th className="px-4 py-4">Course Title</th>
                    <th className="px-4 py-4">Course Category</th>
                    <th className="px-4 py-4">Instructor</th>
                    <th className="px-4 py-4">Total Lectures</th>
                    <th className="px-4 py-4">Description</th>
                    <th className="px-4 py-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    myCourse?.map((course,idx)=>{
                      return(
                        <tr key={idx} className="border-t border-slate-200">
                          <td className="px-4 py-4 align-top font-semibold">{idx+1}</td>
                          <td className="px-4 py-4 align-top">
                            <p className="max-w-xs break-words">{course?.title}</p>
                          </td>
                          <td className="px-4 py-4 align-top">
                            <p className="max-w-xs break-words">{course?.category}</p>
                          </td>
                          <td className="px-4 py-4 align-top">
                            <p className="max-w-xs break-words">{course?.createdBy}</p>
                          </td>
                          <td className="px-4 py-4 align-top">
                            <p className="text-center font-semibold">{course?.numbersOfLecture}</p>
                          </td>
                          <td className="px-4 py-4 align-top">
                            <p className="max-w-md break-words leading-6 text-slate-600">{course?.description}</p>
                          </td>
                          <td className="px-4 py-4 align-top">
                            <div className="flex w-max items-center gap-3">
                              <button
                                className="btn btn-success"
                                onClick={()=>{navigate(`/course/${course?._id}/displaylectures`,{state :{...course}})}}
                              >
                                <BsCollectionPlayFill/>
                              </button>
                              <button
                                className="btn btn-warning"
                                onClick={()=>{DeleteCourse(course?._id)}}
                              >
                                <BsTrash/>
                              </button>
                            </div>
                          </td>
                        </tr>
                      )
                    })
                  }
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </div>

    </Homelayout>
  )
}

export default Dashboard
