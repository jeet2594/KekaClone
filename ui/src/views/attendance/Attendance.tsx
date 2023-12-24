import http from "@/http"
import { useEffect, useState } from "react";
import LoadingBar from 'react-top-loading-bar';
import Skeleton from 'react-loading-skeleton'
import { Link } from "react-router-dom";
import { format } from 'date-fns';
import type { DatePickerProps } from 'antd';
import { DatePicker } from 'antd';
import Button from "@/components/Button";
const formatDate = (date: string) => {
	const inputDate = date;
	const dateObject = new Date(inputDate);
	return format(dateObject, "MMM dd, EEE");
}

interface Attendance {
	id: number,
	date: string,
	isShortAttendance: boolean,
	totalAttendance: string,
	isAbsent: boolean,
	isHoliday: boolean
}

const getDay = (date: string) => {
	const inputDate = date;
	const dateObject = new Date(inputDate);
	return format(dateObject, "EEE");
}
const currentMonth = (new Date().getMonth() + 1).toString();
const currentYear = new Date().getFullYear().toString();
console.log();

const Attendance = () => {



	const [clockInStatus, setClockInStatus] = useState(false);
	const [attendanceHistory, setAttendanceHistory] = useState<Attendance[]>([]);
	const [loadBarProgress, setLoadBarProgress] = useState(0);
	const [isLoading, setIsLoading] = useState(true);
	const [searchYear, setSearchYear] = useState(currentYear);
	const [searchMonth, setSearchMonth] = useState(currentMonth);

	useEffect(() => {
		setLoadBarProgress(30);  // Set initial progress when component mounts
	}, []);
	useEffect(() => {
		setLoadBarProgress(70);
		setIsLoading(true)
		http.get(`/user-attendance/attendance-list/${searchMonth}/${searchYear}`).then(res => {
			console.log(res);
			const { status, attendance } = res.data;
			if (status) {
				setAttendanceHistory(attendance.attendanceListForMonth);
				setIsLoading(false)
			}
			setLoadBarProgress(100);

		}).catch(error => {
			console.log(error);

		})
	}, [searchMonth, searchYear])

	useEffect(() => {
		http.get(`/user-attendance/isClockIn`).then(res => {
			console.log(res);
			const { status, isClockIn } = res.data;
			if (status) {
				setClockInStatus(isClockIn);
			}

		}).catch(error => {
			console.log(error);

		})
	}, [])

	const onChange: DatePickerProps['onChange'] = (date, dateString) => {
		console.log(date, dateString);
		if (date) {
			console.log('if');

			const year = dateString.substring(0, 4);
			const month = dateString.substring(5, 7);
			setSearchYear(year);
			setSearchMonth(month);
			console.log('year is ', year);
			console.log('month is ', month);
		} else {
			setSearchYear(currentYear);
			setSearchMonth(currentMonth);
		}
	};

	const clockIn = () => {
		const api = clockInStatus ? 'check-out' : 'check-in';
		http.post(`/user-attendance/${api}`).then(res => {
			console.log(res);
			const { status } = res.data;
			if (status) {
				setClockInStatus(!clockInStatus);
			}
		}).catch(error => {
			console.log(error);
		});
	}
	return (
		<div>
			<LoadingBar
				color="#f11946"
				progress={loadBarProgress}
				onLoaderFinished={() => setLoadBarProgress(0)}
			/>
			<div className="content d-flex flex-column flex-column-fluid" id="kt_content">
				{/*begin::Toolbar*/}
				<div className="toolbar" id="kt_toolbar">
					{/*begin::Container*/}
					<div id="kt_toolbar_container" className="container-fluid d-flex flex-stack">
						{/*begin::Page title*/}
						<div data-kt-swapper="true" data-kt-swapper-mode="prepend" data-kt-swapper-parent="{default: '#kt_content_container', 'lg': '#kt_toolbar_container'}" className="page-title d-flex align-items-center flex-wrap me-3 mb-5 mb-lg-0">
							{/*begin::Title*/}
							<h1 className="d-flex align-items-center text-dark fw-bolder fs-3 my-1">Attendance
								<span className="h-20px border-gray-200 border-start ms-3 mx-2" ></span>

								<ul className="breadcrumb breadcrumb-separatorless fw-bold fs-7 my-1">
									<li className="breadcrumb-item text-muted">
										<Link to="/dashboard"><label className="text-muted text-hover-primary">Dashboard</label></Link>
									</li>
									<li className="breadcrumb-item">
										<span className="bullet bg-gray-300 w-5px h-2px"></span>
									</li>
									<li className="breadcrumb-item text-dark">Attendance History</li>
								</ul>
							</h1>
							{/*end::Title*/}
						</div>
						{/*end::Page title*/}
					</div>
					{/*end::Container*/}
				</div>
				{/*end::Toolbar*/}
				{/*begin::Post*/}
				<div className="post d-flex flex-column-fluid" id="kt_post">
					<div id="kt_content_container" className="container-xxl">
						<div className="card">
							<div className="card-header border-0 pt-6">
								<div className="card-title">
									<div className="d-flex align-items-center position-relative my-1">
										<span className="svg-icon svg-icon-1 position-absolute ms-6">
											<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
												<rect opacity="0.5" x="17.0365" y="15.1223" width="8.15546" height="2" rx="1" transform="rotate(45 17.0365 15.1223)" fill="currentColor" />
												<path d="M11 19C6.55556 19 3 15.4444 3 11C3 6.55556 6.55556 3 11 3C15.4444 3 19 6.55556 19 11C19 15.4444 15.4444 19 11 19ZM11 5C7.53333 5 5 7.53333 5 11C5 14.4667 7.53333 17 11 17C14.4667 17 17 14.4667 17 11C17 7.53333 14.4667 5 11 5Z" fill="currentColor" />
											</svg>
										</span>
										<DatePicker onChange={onChange} picker="month" />
									</div>
								</div>
								<div className="card-toolbar">
									<div className="d-flex justify-content-end" data-kt-customer-table-toolbar="base">
										{
											clockInStatus
												?
												<Button
													label="Clock Out"
													className="btn btn-primary"
													type="button"
													id="clockOut"
													onClick={() => clockIn()}
												/>
												:
												<Button
													label="Clock In"
													className="btn btn-primary"
													type="button"
													id="clockIn"
													onClick={() => clockIn()}
												/>
										}
									</div>
								</div>
							</div>
							<div className="card-body pt-0">
								<table className="table align-middle table-row-dashed fs-6 gy-5" id="kt_customers_table">
									<thead>
										<tr className="text-start text-gray-400 fw-bolder fs-7 text-uppercase gs-0">

											<th className="col-3">Date</th>
											<th className="col-3">Status</th>
											<th className="col-3">Effective Hours</th>
											<th className="text-end col-3">Actions</th>
										</tr>
									</thead>
									<tbody className="fw-bold text-gray-600">
										{
											isLoading
												?
												(
													Array.from({ length: 30 }).map((_, rowIndex) => (
														<tr key={rowIndex}>
															<td className="col-0.5" >
																<Skeleton style={{ height: '40px' }} />
															</td>
															<td className="col-4">
																<Skeleton style={{ height: '40px' }} />
															</td>
															<td className="col-4">
																<Skeleton style={{ height: '40px' }} />
															</td>
															<td className='text-end col-2'>
																<Skeleton style={{ height: '40px' }} />
															</td>
														</tr>
													))
												) : (
													attendanceHistory.length === 0
														?
														<tr>
															<td colSpan={4} className="text-center">
																No matching data found
															</td>
														</tr> :
														attendanceHistory.map((value, index) => {
															return (<tr key={index} style={{ backgroundColor: getDay(value.date) === 'Sun' || getDay(value.date) === 'Sat' ? '#c5c5c5' : value.isHoliday ? '#a5c5b6' : '' }}>

																<td className="col-3">
																	{formatDate(value.date)} {getDay(value.date) === 'Sun' || getDay(value.date) === 'Sat' ? <span className="badge badge-primary">W-OFF</span> : ''}
																</td>
																<td className="col-3">
																	{value.isShortAttendance === false ? <span className="badge badge-success">P</span> : value.isAbsent === false ? <span className="badge badge-warning">P</span> : <span className="badge badge-danger">A</span>}
																</td>
																<td className="col-3">
																	{value.totalAttendance}
																</td>
																<td className="text-end col-3">
																	{value.totalAttendance}
																</td>

															</tr>)
														})
												)
										}
									</tbody>

								</table>

							</div>
						</div>
					</div>
				</div>
				{/*end::Post*/}
			</div>
		</div>
	)
}

export default Attendance