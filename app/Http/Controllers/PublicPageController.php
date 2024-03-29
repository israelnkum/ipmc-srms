<?php

namespace App\Http\Controllers;

use App\Helpers\Helper;
use App\Http\Resources\AllProgramsResource;
use App\Http\Resources\EnquiryResource;
use App\Http\Resources\OngoingProgramResource;
use App\Http\Resources\ProgramResource;
use App\Http\Resources\SubjectResource;
use App\Models\AllPrograms;
use App\Models\Branch;
use App\Models\Holiday;
use App\Models\OngoingProgram;
use App\Models\Program;
use App\Models\Sponsor;
use App\Models\Student;
use App\Models\Module;
use Carbon\Carbon;
use Exception;
use Illuminate\Contracts\Foundation\Application;
use Illuminate\Contracts\View\Factory;
use Illuminate\Contracts\View\View;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class PublicPageController extends Controller
{
    public function index(): View|\Illuminate\Foundation\Application|Factory|Application
    {
//        $this->dispatch(new SendNewEnquiryJob([]));
        return view('public-enquiry.home');
//        $data =  Enquiry::first();

//        return view('print.students.enquiry', compact('data'));
    }

    public function getPrograms(): Collection
    {
        return AllProgramsResource::collection(AllPrograms::all())->collection->groupBy('type');
    }

    public function getBranches(): Collection
    {
        return Branch::all();
    }

    public function newEnquiry(Request $request): JsonResponse|EnquiryResource
    {
        DB::beginTransaction();
        try {

            $sponsor = Sponsor::create([
                'name' => $request->sponsor_name,
                'email' => $request->sponsor_email,
                'phone_number' => $request->sponsor_number,
                'relationship' => $request->relationship,
            ]);

            $student = Student::create([
                'first_name' => $request->first_name,
                'last_name' => $request->last_name,
                'other_name' => $request->other_name,
                'phone_number' => $request->phone_number,
                'dob' => Carbon::parse($request->dob)->format('Y-m-d'),
                'country' => $request->country,
                'nationality' => $request->nationality,
                'gender' => $request->gender,
                'alt_phone_number' => $request->alt_phone_number,
                'email' => $request->email,
                'address' => $request->address,
                'box_address' => $request->box_address,
                'house_number' => $request->house_number,
                'digital_address' => $request->digital_address,
                'id_type' => $request->id_type,
                'id_number' => $request->id_number,
                'education_qualifications' => $request->education_qualifications,
                'other_qualification' => $request->other_qualification,
                'sponsor_id' => $sponsor->id,
                'branch_id' => $request->branch_id,
                'student_number' => Helper::generateStudentNumber()
            ]);

            $enquiry = $student->enquiry()->create([
                'programs' => $request->programs,
                'other_program' => $request->other_program,
                'preferred_timings' => $request->preferred_timings,
                'other_preferred_timing' => $request->other_preferred_timing,
                'heard' => $request->heard,
                'other_heard' => $request->other_heard,
                'branch_id' => $request->branch_id,
                'school_name' => $request->school_name
            ]);

//            $sendMail = new SendNewEnquiryJob();
//            $sendMail->to(['counselor.tk@ipmcghana.com']);
//            $this->dispatch($sendMail);

            DB::commit();
            return new EnquiryResource($enquiry);
        } catch (Exception $exception) {
            Log::error('new enquiry: ', [$exception]);
            DB::rollBack();

            return response()->json([
                'message' => 'Something went wrong'
            ], 400);
        }
    }

    public function debug()
    {
        $ongoingProgram = OngoingProgram::query()->find(1);

        $modules = $ongoingProgram->program->modules->where('semester', 1);

        $data = [
            'batch' => $ongoingProgram,
            'modules' => $modules,
            'totalDuration' => $modules->sum('duration.duration')
        ];

        return \view('print.ongoing-programs.batch-plan', compact('data'));
    }

    public function getHolidays(): Collection
    {
        return Holiday::all()->pluck('start_date');
    }
}
