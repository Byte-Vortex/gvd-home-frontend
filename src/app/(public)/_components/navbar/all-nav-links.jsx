import { MdTempleHindu } from "react-icons/md";
import { LuHome } from "react-icons/lu";
import { FaRegStar } from "react-icons/fa";
import { IoGiftOutline } from "react-icons/io5";
import { HiOutlineSparkles } from "react-icons/hi";
import { HiOutlineViewGridAdd as MoreIcon } from "react-icons/hi"


const homeRoute = {
    title: "Home",
    to: "/",
    icon: <LuHome />,
}

const mandirRoutes = {
    title: "Mandir",
    icon: <HiOutlineSparkles />,
    children: [
        {
            to: "/mandir/about/",
            title: "About Us"
        },
        {
            to: "/mandir/our-mission/",
            title: "Our Mission"
        },
        {
            to: "/mandir/our-history/",
            title: "Our History"
        },
        {
            to: "/mandir/our-objectives/",
            title: "Our Objectives"
        },
        {
            to: "/mandir/our-centers/",
            title: "Our Centers"
        },
        {
            to: "/mandir/our-architecture/",
            title: "Our Architecture"
        },
        {
            to: "/mandir/explore/",
            title: "Explore Temple"
        },
        {
            to: "/mandir/gallery/",
            title: "Gallery"
        },
        {
            to: "/mandir/our-schedule/",
            title: "Our Schedule"
        },
        {
            to: "/mandir/contact-us/",
            title: "Contact Us"
        },

    ]
}
const prabhupadaRoutes = {
    title: "Prabhupada",
    icon: <IoGiftOutline />,
    children: [
        {
            to: "/srila-prabhupada/the-guru/",
            title: "The Guru"
        },
        {
            to: "/srila-prabhupada/about/",
            title: "About"
        },
        {
            to: "/srila-prabhupada/biography/",
            title: "Biography"
        },
        {
            to: "/srila-prabhupada/qualities/",
            title: "Qualitites"
        },
        {
            to: "/srila-prabhupada/facts/",
            title: "Facts"
        },
        {
            to: "/srila-prabhupada/milestone-timeline/",
            title: "Milestone Timeline"
        },
        {
            to: "/srila-prabhupada/books/",
            title: "Books"
        },
        {
            to: "/srila-prabhupada/sampradaya/",
            title: "Sampradaya"
        }
    ]
}

const activitiesRoutes = {
    title: "Activities",
    icon: <FaRegStar />,
    children: [
        {
            to: "/activities/education/",
            title: "Education"
        },
        {
            to: "/activities/food-distribution/",
            title: "Food Distribution"
        },
        {
            to: "/activities/cow-protection/",
            title: "Cow Protection"
        },
        {
            to: "/activities/yuga-dharma/",
            title: "Yuga Dharma"
        },
        {
            to: "/activities/projects/",
            title: "Projects"
        },
        // {
        //     to: "/yatras/",
        //     title: "Yatras"
        // },
        {
            to: "/activities/events/",
            title: "Events"
        },
        {
            to: "/activities/services/",
            title: "Services"
        },
    ]
}
const festivalRoutes = {
    title: "Festivals",
    to: "/festivals",
}

const getInvolvedRoutes = {
    title: "Get Involved",
    children: [
        {
            to: "/blogs/",
            title: "Blogs"
        },
        {
            to: "/web-stories/",
            title: "Web Stories"
        },
        {
            to: "/get-involved/vaishnav-calendar/",
            title: "Vaishnav Calendar"
        },
        {
            to: "/get-involved/volunteer/",
            title: "Volunteer"
        },
        {
            to: "/get-involved/careers/",
            title: "Careers"
        },
    ]
}


export default {

    desktop: [
        homeRoute,
        mandirRoutes,
        prabhupadaRoutes,
        activitiesRoutes,
        festivalRoutes,
        getInvolvedRoutes
    ],

    mobile: [
        homeRoute,
        mandirRoutes,
        prabhupadaRoutes,
        activitiesRoutes,
        {
            title: "More",
            icon: <MoreIcon />,
            children: [
                festivalRoutes,
                getInvolvedRoutes
            ],
        },

    ]
}
