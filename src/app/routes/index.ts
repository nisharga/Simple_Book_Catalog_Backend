 
import express from 'express';
const router = express.Router();

const moduleRoutes = [
    {
        // path: '/academic-faculty',
        // route: FacultyRoutes,
    }, 
]
moduleRoutes.forEach(route => router.use(route.path, route.route));

export default router;