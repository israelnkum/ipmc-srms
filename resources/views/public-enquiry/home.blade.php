<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>{{ config('app.name', 'IPMC - SRMS') }}</title>

    <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="{{asset('/css/app-landing.css')}}">
</head>
<body class="antialiased">
<div id="public-enquiry"></div>
<div id="portal"></div>
<script src="{{asset('/js/landing.js')}}"></script>
</body>
</html>
