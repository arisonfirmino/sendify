import { format, formatDistanceToNow, isToday, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";

export function formatMessageDate(dateString: string | Date) {
  const messageDate =
    typeof dateString === "string" ? parseISO(dateString) : dateString;

  if (isToday(messageDate)) {
    return `${formatDistanceToNow(messageDate, { addSuffix: true, locale: ptBR })}`;
  }

  return format(messageDate, "dd MMM, 'às' hh:mm a", { locale: ptBR });
}
