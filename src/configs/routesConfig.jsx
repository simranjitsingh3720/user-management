
import { Navigate } from 'react-router-dom';
import SignInConfig from '../main/Signin/SigninConfig';
import CoreUtils from "../core/utils/CoreUtils";

const routeConfigs = [
	SignInConfig,
];
/**
 * The routes of the application.
 */
const routes = [
	...CoreUtils.generateRoutesFromConfigs(routeConfigs, 'admin'),
	{
		path: '/',
		element: <Navigate to="/dashboards/project" />,
		auth: 'admin'
	},
	{
		path: '*',
		element: <Navigate to="404" />
	}
];
export default routes;
