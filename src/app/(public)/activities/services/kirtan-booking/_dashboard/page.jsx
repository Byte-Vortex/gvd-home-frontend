import { FaCalendar as CalendarIcon, FaClock as ClockIcon, FaMap as MapIcon } from "react-icons/fa6";


export default function KirtanDashBoardPage() {

    const data = [
        {
            program_types: ["Kirtan", "Yagna", "Trip"],
            program_theme: "Birthday",
            date: "22/03/2024",
            time: "1:00 PM - 5:00 PM",
            address: "12, Apple Nagar",
            coordinator: "RAMD",
            team_members: ["ABC", "DEF", "GHI", "JKL", "MNO", "PQR", "STU", "VWX", "YZ"]
        },
        {
            program_types: ["Kirtan", "Yagna", "Trip"],
            program_theme: "Birthday",
            date: "22/03/2024",
            time: "1:00 PM - 5:00 PM",
            address: "12, Apple Nagar",
            coordinator: "RAMD",
            team_members: ["ABC", "DEF", "GHI", "JKL", "MNO", "PQR", "STU", "VWX", "YZ", "ABC", "DEF", "GHI", "JKL", "MNO", "PQR", "STU", "VWX", "YZ"]
        },
        {
            program_types: ["Kirtan", "Yagna", "Trip"],
            program_theme: "Birthday",
            date: "22/03/2024",
            time: "1:00 PM - 5:00 PM",
            address: "12, Apple Nagar",
            coordinator: "RAMD",
            team_members: ["ABC", "DEF", "GHI", "JKL", "MNO", "PQR", "STU", "VWX", "YZ"]
        },
        {
            program_types: ["Kirtan", "Yagna", "Trip"],
            program_theme: "Birthday",
            date: "22/03/2024",
            time: "1:00 PM - 5:00 PM",
            address: "12, Apple Nagar",
            coordinator: "RAMD",
            team_members: ["ABC", "DEF", "GHI", "JKL", "MNO", "PQR", "STU", "VWX", "YZ"]
        },
        {
            program_types: ["Kirtan", "Yagna", "Trip"],
            program_theme: "Birthday",
            date: "22/03/2024",
            time: "1:00 PM - 5:00 PM",
            address: "12, Apple Nagar",
            coordinator: "RAMD",
            team_members: ["ABC", "DEF", "GHI", "JKL", "MNO", "PQR", "STU", "VWX", "YZ"]
        },
        {
            program_types: ["Kirtan", "Yagna", "Trip"],
            program_theme: "Birthday",
            date: "22/03/2024",
            time: "1:00 PM - 5:00 PM",
            address: "12, Apple Nagar",
            coordinator: "RAMD",
            team_members: ["ABC", "DEF", "GHI", "JKL", "MNO", "PQR", "STU", "VWX", "YZ"]
        }
    ];
    return (
        <div className="p-6">

            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
                {
                    data.map((item, index) => <Card data={item} key={index} />)
                }
            </div>
        </div>
    )
}

function Card({ data }) {
    return (
        <div className="rounded-3xl p-4 bg-gray-200 flex-grow max-w-xs mx-auto space-y-4 border border-black">
            <div className="rounded-full py-1.5 text-center px-2 bg-gray-400 text-lg">
                {
                    data.program_types.reduce((acc, curr) => {
                        acc = acc + (" & ") + curr;
                        return acc;
                    })
                }
            </div>

            <div className="rounded-full py-1.5 text-center px-2 bg-gray-400">
                {data.program_theme}
            </div>

            <div className="flex justify-between text-sm flex-wrap gap-2">
                <div className="flex gap-2 items-center">
                    <CalendarIcon />
                    {data.date}
                </div>

                <div className="flex gap-2 items-center">
                    <ClockIcon />
                    {data.time}
                </div>
            </div>

            <div className="flex gap-2 items-center">
                <MapIcon />
                {data.address}
            </div>
            <div>
                <div>Coordinator</div>
                <div>{data.coordinator}</div>
            </div>

            <div className="space-y-0.5">
                <div>Team Members</div>
                <div className="flex flex-wrap gap-2 text-sm">
                    {
                        data.team_members.map((item, index) => (
                            <span key={index} className="rounded-full px-2 py-0.5 bg-gray-400">{item}</span>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}