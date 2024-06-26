import { FormGroup } from '@angular/forms';

export function getErrorMessage(control: string, form: FormGroup<any>) {
    let errors = <Object>form.controls[control].errors;

    let key = Object.keys(errors)[0];

    switch (key) {
        case 'required':
            return 'validation.required';
        case 'email':
            return 'validation.email';
        case 'minlength':
            return 'validation.minlength';
        case 'pwdMatch':
            return 'validation.pwd-match';
        case 'matched':
            return 'validation.pwd-match';
        case 'pattern':
            return 'validation.url';
        case 'minTagsLength':
            return 'validation.minTagsLength';
        default:
            return '';
    }
}

export function isDefined(value: any) {
    return typeof value !== 'undefined' && value !== null;
}
export function coerceBooleanProperty(value: any) {
    return value != null && `${value}` !== 'false';
}
export function dateParser(date: any) {
    const parsed = new Date(date);
    if (!Number.isNaN(parsed.valueOf())) {
        return parsed;
    }
    const parts = String(date).match(/\d+/g);
    if (parts === null || parts.length <= 2) {
        return parsed;
    } else {
        const [firstP, secondP, ...restPs] = parts.map((x) => parseInt(x, 10));
        return new Date(Date.UTC(firstP, secondP - 1, ...restPs));
    }
}
export const MINUTE = 60;
export const HOUR = MINUTE * 60;
export const DAY = HOUR * 24;
export const WEEK = DAY * 7;
export const MONTH = DAY * 30;
export const YEAR = DAY * 365;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2xpYi9zcmMvdXRpbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLFVBQVUsU0FBUyxDQUFDLEtBQVU7SUFDbEMsT0FBTyxPQUFPLEtBQUssS0FBSyxXQUFXLElBQUksS0FBSyxLQUFLLElBQUksQ0FBQztBQUN4RCxDQUFDO0FBRUQsTUFBTSxVQUFVLHFCQUFxQixDQUFDLEtBQVU7SUFDOUMsT0FBTyxLQUFLLElBQUksSUFBSSxJQUFJLEdBQUcsS0FBSyxFQUFFLEtBQUssT0FBTyxDQUFDO0FBQ2pELENBQUM7QUFFRCxNQUFNLFVBQVUsVUFBVSxDQUFDLElBQVM7SUFDbEMsTUFBTSxNQUFNLEdBQUcsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDOUIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxDQUFDLEVBQUU7UUFDbkMsT0FBTyxNQUFNLENBQUM7S0FDZjtJQUVELE1BQU0sS0FBSyxHQUFhLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDbkQsSUFBSSxLQUFLLEtBQUssSUFBSSxJQUFJLEtBQUssQ0FBQyxNQUFNLElBQUksQ0FBQyxFQUFFO1FBQ3ZDLE9BQU8sTUFBTSxDQUFDO0tBQ2Y7U0FBTTtRQUNMLE1BQU0sQ0FBQyxNQUFNLEVBQUUsT0FBTyxFQUFFLEdBQUcsTUFBTSxDQUFDLEdBQUcsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUNyRSxPQUFPLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLE9BQU8sR0FBRyxDQUFDLEVBQUUsR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDO0tBQzNEO0FBQ0gsQ0FBQztBQUVELE1BQU0sQ0FBQyxNQUFNLE1BQU0sR0FBRyxFQUFFLENBQUM7QUFDekIsTUFBTSxDQUFDLE1BQU0sSUFBSSxHQUFHLE1BQU0sR0FBRyxFQUFFLENBQUM7QUFDaEMsTUFBTSxDQUFDLE1BQU0sR0FBRyxHQUFHLElBQUksR0FBRyxFQUFFLENBQUM7QUFDN0IsTUFBTSxDQUFDLE1BQU0sSUFBSSxHQUFHLEdBQUcsR0FBRyxDQUFDLENBQUM7QUFDNUIsTUFBTSxDQUFDLE1BQU0sS0FBSyxHQUFHLEdBQUcsR0FBRyxFQUFFLENBQUM7QUFDOUIsTUFBTSxDQUFDLE1BQU0sSUFBSSxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZnVuY3Rpb24gaXNEZWZpbmVkKHZhbHVlOiBhbnkpOiBib29sZWFuIHtcbiAgcmV0dXJuIHR5cGVvZiB2YWx1ZSAhPT0gJ3VuZGVmaW5lZCcgJiYgdmFsdWUgIT09IG51bGw7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjb2VyY2VCb29sZWFuUHJvcGVydHkodmFsdWU6IGFueSk6IGJvb2xlYW4ge1xuICByZXR1cm4gdmFsdWUgIT0gbnVsbCAmJiBgJHt2YWx1ZX1gICE9PSAnZmFsc2UnO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZGF0ZVBhcnNlcihkYXRlOiBhbnkpOiBEYXRlIHtcbiAgY29uc3QgcGFyc2VkID0gbmV3IERhdGUoZGF0ZSk7XG4gIGlmICghTnVtYmVyLmlzTmFOKHBhcnNlZC52YWx1ZU9mKCkpKSB7XG4gICAgcmV0dXJuIHBhcnNlZDtcbiAgfVxuXG4gIGNvbnN0IHBhcnRzOiBzdHJpbmdbXSA9IFN0cmluZyhkYXRlKS5tYXRjaCgvXFxkKy9nKTtcbiAgaWYgKHBhcnRzID09PSBudWxsIHx8IHBhcnRzLmxlbmd0aCA8PSAyKSB7XG4gICAgcmV0dXJuIHBhcnNlZDtcbiAgfSBlbHNlIHtcbiAgICBjb25zdCBbZmlyc3RQLCBzZWNvbmRQLCAuLi5yZXN0UHNdID0gcGFydHMubWFwKHggPT4gcGFyc2VJbnQoeCwgMTApKTtcbiAgICByZXR1cm4gbmV3IERhdGUoRGF0ZS5VVEMoZmlyc3RQLCBzZWNvbmRQIC0gMSwgLi4ucmVzdFBzKSk7XG4gIH1cbn1cblxuZXhwb3J0IGNvbnN0IE1JTlVURSA9IDYwO1xuZXhwb3J0IGNvbnN0IEhPVVIgPSBNSU5VVEUgKiA2MDtcbmV4cG9ydCBjb25zdCBEQVkgPSBIT1VSICogMjQ7XG5leHBvcnQgY29uc3QgV0VFSyA9IERBWSAqIDc7XG5leHBvcnQgY29uc3QgTU9OVEggPSBEQVkgKiAzMDtcbmV4cG9ydCBjb25zdCBZRUFSID0gREFZICogMzY1O1xuIl19
