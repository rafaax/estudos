import { CallHandler, ExecutionContext, NestInterceptor } from "@nestjs/common";
import { tap } from "rxjs";
import { Observable } from "rxjs";

export class LogInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler <any>): Observable <any> | Promise <Observable<any>> {

        const date = Date.now();
        return next.handle().pipe(tap(() => {
            console.log(`Execução levou ${Date.now() - date} milisegundos..`)
        }))
    }
}