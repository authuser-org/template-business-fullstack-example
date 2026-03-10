import {
	ArgumentsHost,
	Catch,
	ExceptionFilter,
	HttpException,
	HttpStatus,
} from '@nestjs/common';
import { FastifyReply, FastifyRequest } from 'fastify';

type HttpExceptionPayload = {
	message?: string | string[];
	error?: string;
};

function isHttpExceptionPayload(value: unknown): value is HttpExceptionPayload {
	return typeof value === 'object' && value !== null;
}

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
	catch(exception: unknown, host: ArgumentsHost): void {
		const ctx = host.switchToHttp();
		const response = ctx.getResponse<FastifyReply>();
		const request = ctx.getRequest<FastifyRequest>();

		const statusCode =
			exception instanceof HttpException
				? exception.getStatus()
				: HttpStatus.INTERNAL_SERVER_ERROR;

		const exceptionResponse =
			exception instanceof HttpException ? exception.getResponse() : undefined;

		const payload = isHttpExceptionPayload(exceptionResponse)
			? exceptionResponse
			: undefined;

		const message =
			payload?.message ??
			(exception instanceof Error
				? exception.message
				: 'Internal server error');

		response.status(statusCode).send({
			success: false,
			statusCode,
			error: payload?.error ?? HttpStatus[statusCode],
			message,
			path: request.url,
			method: request.method,
			timestamp: new Date().toISOString(),
		});
	}
}
