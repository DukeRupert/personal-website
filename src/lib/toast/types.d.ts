export type ToastEventType = 'success' | 'warning' | 'error';

export type ToastEventPayload = {
	type: ToastEventType;
	title: string;
	description: string;
};

export type ToastEvent = {
	toast: ToastEventPayload;
};