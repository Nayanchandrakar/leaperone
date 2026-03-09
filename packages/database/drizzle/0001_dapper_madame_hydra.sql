ALTER TABLE "file" RENAME COLUMN "user_id" TO "uploaded_by";--> statement-breakpoint
ALTER TABLE "file" DROP CONSTRAINT "file_user_id_user_id_fk";
--> statement-breakpoint
ALTER TABLE "file" ADD CONSTRAINT "file_uploaded_by_user_id_fk" FOREIGN KEY ("uploaded_by") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "storage" DROP COLUMN "quota";